# Thermo Scheduler Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrazione HACS per Home Assistant che programma uno o più `climate` come un termostato Nest (fasce, override "fino alle X", condizioni di blocco da UI).

**Architecture:** Un modulo Python puro (`core/`, nessun import `homeassistant`) calcola fascia corrente, prossimo cambio, condizioni e precedenza. Un `Manager` HA lo usa con un solo timer sul prossimo cambio e con listener di stato per override e condizioni. La card Lit parla col backend via websocket.

**Tech Stack:** Python (HA custom integration), pytest, pytest-homeassistant-custom-component, TypeScript + Lit, pnpm, rollup.

**Spec:** `docs/superpowers/specs/2026-11-01-thermostat-scheduler-design.md`

## Global Constraints

- Dominio e cartella: `custom_components/thermo_scheduler/`; repo nuovo in `~/thermo_scheduler` (scelta mia), da tenere separato da `/Volumes/config`.
- `core/` non importa `homeassistant`. Nessuna dipendenza runtime.
- Nessun polling: solo `async_track_point_in_time`, listener di stato e `async_call_later`.
- Giorni: `0 = lunedì … 6 = domenica`. Orari in fuso locale di HA (`zoneinfo`).
- Persistenza con `homeassistant.helpers.storage.Store`.
- UI in italiano e inglese (`translations/it.json`, `translations/en.json`); la card è funzionale e senza stile (la grafica arriva dopo, con Claude Design).
- Dipendenze di sviluppo (`pytest`, `pytest-homeassistant-custom-component`, `lit`, `typescript`, `rollup`, gestore `pnpm`): installarle solo dopo conferma esplicita dell'utente.
- Ogni commit termina con le righe di attribuzione richieste dalla sessione.

## Review Focus

- Climate `unavailable`/`unknown` quando scatta il timer: salta senza errore e riapplica la fascia corrente quando torna disponibile.
- Cambio ora legale (Europe/Rome, 2027-03-28 e 2026-10-25): niente eccezioni, prossimo cambio sempre nel futuro.
- Programmazione modificata o eliminata mentre è assegnata o c'è un override: ricalcola, l'override valido resta fino alla sua scadenza.
- Entità di una condizione `unavailable` all'avvio di HA: il test è falso, nessuna azione `off` spuria.
- Setpoint fuori da `min_temp`/`max_temp` del climate o `hvac_mode` non supportato: si limita il setpoint e si ignora la modalità non supportata.

---

### Task 1: Scaffold e motore delle fasce

**Files:**
- Create: `custom_components/thermo_scheduler/core/schedule.py`, `tests/core/test_schedule.py`, `pyproject.toml`
- Prerequisito: `git init` in `~/thermo_scheduler`; installare le dipendenze di sviluppo Python (con conferma).

**Interfaces:**
- Produces:
  - `Block(days: frozenset[int], start: datetime.time, temperature: float, hvac_mode: str | None = None)` (dataclass frozen)
  - `Profile(id: str, name: str, blocks: tuple[Block, ...])`
  - `current_block(profile: Profile, now: datetime) -> tuple[Block, datetime] | None` (blocco e suo inizio; `None` se senza blocchi)
  - `next_change(profile: Profile, now: datetime) -> datetime | None`

- [ ] **Step 1: Test falliti** in `tests/core/test_schedule.py`. Profilo: lun–ven 06:30→21.0 e 22:00→17.0; sab–dom 08:00→20.0 e 23:00→17.0. Con `now` aware in Europe/Rome:
  - `test_current_block_weekday`: mer 2026-11-04 07:00 → temperatura 21.0, inizio 2026-11-04 06:30; `next_change` = 2026-11-04 22:00.
  - `test_last_block_wraps_to_next_day`: mer 2026-11-04 23:00 → 17.0; `next_change` = gio 2026-11-05 06:30.
  - `test_before_first_block_uses_previous_day`: lun 2026-11-02 05:00 → 17.0, inizio dom 2026-11-01 23:00.
  - `test_empty_profile`: `current_block` e `next_change` restituiscono `None`.
  - `test_dst_no_exception`: blocco 02:30 il 2027-03-28 (ora inesistente), `next_change(...)` è aware e maggiore di `now`.
- [ ] **Step 2:** `pytest tests/core/test_schedule.py -v` → FAIL (modulo mancante).
- [ ] **Step 3: Implementare** le funzioni sopra in `schedule.py`. Approccio: generare le occorrenze dei blocchi per ieri/oggi/domani e le prossime 7 giornate, ordinarle, scegliere l'ultima ≤ `now` e la prima > `now`; costruire i `datetime` con `zoneinfo` e normalizzare gli orari inesistenti.
- [ ] **Step 4:** stesso comando → PASS.
- [ ] **Step 5: Commit** `feat(core): schedule engine`.

### Task 2: Condizioni

**Files:**
- Create: `custom_components/thermo_scheduler/core/conditions.py`, `tests/core/test_conditions.py`

**Interfaces:**
- Produces:
  - `Check(entity_id: str, op: Literal["=", "!=", ">", "<"], value: str)`
  - `Action(kind: Literal["off", "min_setpoint"], temperature: float | None = None)`
  - `Condition(id: str, name: str, checks: tuple[Check, ...], match: Literal["all", "any"], delay: int, action: Action)`
  - `evaluate(condition: Condition, states: Mapping[str, str]) -> bool`

- [ ] **Step 1: Test falliti**:
  - `test_equal_on`: `Check("binary_sensor.finestra", "=", "on")` con stato `"on"` → True.
  - `test_unavailable_is_false`: stesso check con `"unavailable"` e `"unknown"` → False (anche con `"!="`).
  - `test_numeric_greater`: `Check("sensor.t", ">", "25")` con `"26.5"` → True; con `"abc"` → False.
  - `test_match_all_vs_any`: due check, uno vero e uno falso → `all` False, `any` True.
  - `test_empty_checks_false`: nessun check → False. Entità assente da `states` → test falso.
- [ ] **Step 2:** `pytest tests/core/test_conditions.py -v` → FAIL.
- [ ] **Step 3: Implementare** `evaluate`. `>`/`<` convertono con `float`, errore di conversione = falso. Stati `unavailable`/`unknown` o chiave mancante = test falso.
- [ ] **Step 4:** → PASS. **Step 5: Commit** `feat(core): condition evaluation`.

### Task 3: Precedenza (override > condizione > programmazione)

**Files:**
- Create: `custom_components/thermo_scheduler/core/resolve.py`, `tests/core/test_resolve.py`

**Interfaces:**
- Consumes: `Profile`, `current_block`, `next_change`, `Condition`.
- Produces:
  - `Override(until: datetime, temperature: float | None, hvac_mode: str | None)`
  - `Target(state: Literal["scheduled", "override", "blocked"], temperature: float | None, hvac_mode: str | None, until: datetime | None)`
  - `resolve(profile: Profile, now: datetime, override: Override | None, active: Condition | None) -> Target | None`

- [ ] **Step 1: Test falliti** (stesso profilo del Task 1, `now` = mer 2026-11-04 07:00):
  - `test_scheduled`: nessun override/condizione → `state="scheduled"`, 21.0, `until` = 22:00.
  - `test_valid_override_wins`: `Override(until=22:00, temperature=23.0, ...)` e condizione attiva → `state="override"`, 23.0.
  - `test_expired_override_ignored`: `until` = 06:59 → `scheduled`.
  - `test_condition_off`: `Action("off")` → `state="blocked"`, `hvac_mode="off"`, `temperature=None`.
  - `test_condition_min_setpoint`: `Action("min_setpoint", 12.0)` → `blocked`, 12.0.
  - `test_no_blocks_returns_none` se la programmazione è vuota e non c'è override.
- [ ] **Step 2:** FAIL. **Step 3: Implementare** `resolve` con la precedenza indicata. **Step 4:** PASS. **Step 5: Commit** `feat(core): target resolution`.

### Task 4: Integrazione HA: storage e applicazione della programmazione

**Files:**
- Create: `custom_components/thermo_scheduler/{manifest.json,const.py,__init__.py,config_flow.py,storage.py,manager.py,strings.json}`, `translations/{it,en}.json`, `tests/conftest.py`, `tests/test_manager.py`

**Interfaces:**
- Consumes: Task 1–3.
- Produces:
  - `Storage` con `async_load() -> StoreData`, `async_save(data)`, dati `{profiles, conditions, assignments: {climate_id: {profile_id, condition_ids}}, overrides: {climate_id: Override}}` (datetime in ISO 8601).
  - `Manager(hass, storage)`: `async_start()`, `async_stop()`, `async_refresh(climate_id: str | None = None)`, `target_for(climate_id) -> Target | None`.
  - Config flow a istanza unica che crea la entry senza campi.

- [ ] **Step 1: Test falliti** con `hass` e `freezer`: `test_applies_block_at_start` (a 06:30 viene chiamato `climate.set_temperature` con 21.0 e l'`hvac_mode` del blocco, se presente), `test_timer_rearms_on_next_change`, `test_skips_unavailable_climate_then_applies_when_available`, `test_clamps_to_min_max_temp`, `test_ignores_unsupported_hvac_mode`, `test_config_flow_single_instance`.
- [ ] **Step 2:** `pytest tests/test_manager.py -v` → FAIL.
- [ ] **Step 3: Implementare**. Il Manager ricalcola `target_for` per ogni climate assegnato, applica solo se il target differisce dallo stato attuale e arma un solo timer sul minimo di `Target.until`. I comandi usano un `Context` creato dal Manager, salvato in un insieme `own_context_ids`.
- [ ] **Step 4:** PASS. **Step 5: Commit** `feat: manager applies schedules`.

### Task 5: Override manuale

**Files:** Modify `manager.py`; Test `tests/test_override.py`

**Interfaces:**
- Produces: `Manager.async_clear_override(climate_id)`; listener su `state_changed` dei climate assegnati.

- [ ] **Step 1: Test falliti**: `test_manual_change_creates_override_until_next_block` (cambio con contesto esterno a 07:00 → override fino alle 22:00, nessun comando di ripristino); `test_own_command_is_not_override`; `test_state_change_without_target_diff_is_not_override` (il dispositivo aggiorna lo stato senza differire dal target); `test_override_expires_at_next_block_and_reapplies_schedule`; `test_override_survives_restart` (ricarica da `Store`); `test_profile_edit_keeps_valid_override`.
- [ ] **Step 2:** FAIL. **Step 3: Implementare**: evento il cui `context.id` non è in `own_context_ids` e con temperatura/`hvac_mode` diversi dal target → `Override(until=Target.until, …)` salvato su `Store`. **Step 4:** PASS. **Step 5: Commit** `feat: manual override`.

### Task 6: Condizioni di blocco nel Manager

**Files:** Modify `manager.py`; Test `tests/test_conditions_runtime.py`

- [ ] **Step 1: Test falliti**: `test_condition_applies_after_delay` (finestra `on`, dopo 120 s → `hvac_mode="off"`); `test_condition_cancelled_if_false_before_delay`; `test_condition_end_returns_to_schedule`; `test_activation_clears_existing_override`; `test_manual_change_during_block_wins_and_is_not_reapplied`; `test_unavailable_entity_at_startup_does_not_block`; `test_condition_scoped_to_single_climate` (una condizione assegnata a un solo climate non tocca gli altri).
- [ ] **Step 2:** FAIL. **Step 3: Implementare**: listener sulle entità citate dalle condizioni, `async_call_later(delay)` per il fronte di attivazione, `active` passato a `resolve`. Fine blocco → `async_refresh`. **Step 4:** PASS. **Step 5: Commit** `feat: blocking conditions`.

### Task 7: Entità sensor e servizi

**Files:** Create `sensor.py`, `services.yaml`; Modify `__init__.py`; Test `tests/test_sensor_services.py`

- [ ] **Step 1: Test falliti**: `test_sensor_states` (stato `scheduled|override|blocked|disabled` e attributi `profile`, `setpoint`, `next_change`, `override_until`, `condition`); servizi `set_profile`, `clear_override`, `enable`, `disable` (`disable` smette di comandare e non cancella le assegnazioni).
- [ ] **Step 2:** FAIL. **Step 3: Implementare** un `SensorEntity` per climate assegnato, aggiornato dal Manager; servizi registrati in `async_setup_entry`. **Step 4:** PASS. **Step 5: Commit** `feat: sensors and services`.

### Task 8: API websocket

**Files:** Create `websocket_api.py`; Test `tests/test_websocket.py`

**Interfaces:**
- Produces comandi `thermo_scheduler/{list,save_profile,delete_profile,save_condition,delete_condition,assign,clear_override}` con payload JSON dei dataclass (orari `"HH:MM"`, datetime ISO 8601).

- [ ] **Step 1: Test falliti**: round-trip di salvataggio e lettura di un profilo e di una condizione; `assign` rifiuta un `climate_id` inesistente; `delete_profile` con assegnazioni → errore esplicito (la programmazione non viene eliminata). **Step 2:** FAIL. **Step 3: Implementare** con `websocket_api.async_register_command` e validazione `voluptuous`; ogni modifica chiama `Manager.async_refresh`. **Step 4:** PASS. **Step 5: Commit** `feat: websocket api`.

### Task 9: Card Lovelace (funzionale, senza stile)

**Files:** Create `src/thermo-scheduler-card.ts`, `src/api.ts`, `package.json`, `tsconfig.json`, `rollup.config.mjs`, `tests/card.test.ts` (dipendenze di sviluppo del frontend da confermare); output `custom_components/thermo_scheduler/www/thermo-scheduler-card.js`; Modify `__init__.py` (registrazione della risorsa frontend).

- [ ] **Step 1: Test falliti** (`pnpm test`): `renders override_until label` ("Fino alle 22:00" in italiano), `saves profile via ws`, `lists conditions with delay and action`. **Step 2:** FAIL. **Step 3: Implementare** la card Lit con vista elenco/modifica di programmazioni, assegnazioni e condizioni, markup semantico e nessun CSS decorativo. **Step 4:** PASS e `pnpm build` genera il bundle. **Step 5: Commit** `feat: lovelace card`.

### Task 10: Packaging HACS

**Files:** Create `hacs.json`, `README.md`, `.github/workflows/validate.yml` (HACS action e hassfest)

- [ ] **Step 1:** compilare `hacs.json` (`name`, `render_readme`, `homeassistant` minimo) e il README (installazione HACS, uso, schema dati). **Step 2:** eseguire hassfest e la HACS action in CI; atteso: entrambe verdi. **Step 3: Commit** `chore: hacs packaging`.

## Self-review

- Copertura: fasce e override (Task 1, 5), condizioni e precedenza (2, 3, 6), storage e riavvio (4, 5), entità e servizi (7), websocket (8), card (9), HACS (10).
- Lo stato "disabled" del sensore e la condizione limitata a un solo climate sono coperti nei Task 7 e 6.
- Rimandato per spec: tempo minimo tra cambi di stato (v2).
