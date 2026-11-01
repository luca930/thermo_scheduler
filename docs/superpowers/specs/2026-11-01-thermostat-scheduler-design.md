# Thermostat Scheduler per Home Assistant: design

Nome provvisorio: `thermo_scheduler` (scelta mia, da confermare).

## Intento

Replicare il comportamento di un termostato "vero" (stile Google Nest) per uno o più `climate` di Home Assistant. Oggi chi vuole questo deve incollare automazioni YAML o usare lo Scheduler Component, che non offre override "fino alle X" né programmazioni riutilizzabili su più climate. Il risultato deve essere locale, configurabile solo da UI e installabile da HACS.

## Obiettivi

- Più programmazioni settimanali. Una programmazione può comandare più climate. Ogni climate ha al massimo una programmazione attiva.
- Override manuale stile Nest: se l'utente cambia il termostato a mano, la modifica vale fino all'inizio della fascia successiva. La UI mostra "fino alle X". Alla fascia successiva si torna alla programmazione.
- Condizioni di blocco configurabili da UI, senza YAML (come nello Scheduler Component): per esempio finestra aperta, con effetto `off` o setpoint minimo.
- Un solo repository installabile da HACS, con integrazione e card Lovelace insieme.

## Non-obiettivi (v1)

- Cloud, apprendimento automatico degli orari, modalità assenza/presenza.
- Condizioni su orari o presenza (la programmazione copre gli orari).
- Tempo minimo tra cambi di stato per pompe di calore (valutare in v2).
- Gestione di umidità, ventilazione, swing.

## Anti-obiettivi

- Riaccendere un climate che l'utente ha spento a mano.
- Sovrascrivere un comando manuale al termine di una condizione.
- Polling periodico: la logica è guidata da eventi e timer.

## Modello dati

- **Programmazione**: `id`, `nome`, lista di fasce `{giorni[], inizio, temperatura, hvac_mode?}`. Una fascia vale dall'orario di inizio fino all'inizio della fascia successiva (come Nest; scelta mia, invece di "da/a"). L'ultima fascia del giorno prosegue fino alla prima del giorno dopo.
- **Assegnazione**: `climate_entity_id -> programmazione`. Relazione tipo molti-a-uno: una programmazione, molti climate.
- **Condizione**: `id`, `nome`, lista di test `{entity_id, operatore (=, !=, >, <), valore}`, combinazione `tutte|almeno una`, `ritardo` in secondi, `azione` (`off` oppure `setpoint minimo X`). Le condizioni sono una libreria riutilizzabile, assegnabile a una programmazione (vale per tutti i suoi climate) o a un singolo climate (scelta mia).

## Comportamento

1. **Programmazione**: il motore calcola la fascia corrente e il prossimo cambio, e imposta un solo timer (`async_track_point_in_time`) su quel momento. Ad ogni scatto applica temperatura e `hvac_mode` ai climate assegnati.
2. **Override**: un cambio sul climate non originato dall'integrazione (si distingue col `context` dell'evento) crea un override valido fino all'inizio della fascia successiva. L'override è salvato su disco e sopravvive al riavvio.
3. **Condizione**: quando il test resta vero per tutto il `ritardo`, si applica l'azione. Si applica solo sul fronte di attivazione. Se l'utente comanda a mano durante il blocco, vince il suo comando (diventa un override) e la condizione non riapplica l'azione finché non si disattiva e si riattiva.
4. **Fine condizione**: si torna a ciò che la programmazione prevede in quel momento, non allo stato precedente al blocco (confermato).
5. **Riavvio di HA**: si ricalcola lo stato dalla programmazione, si ripristinano gli override ancora validi e si rivalutano le condizioni.

## Superfici esposte

- Per ogni climate assegnato un'entità `sensor` con stato `scheduled | override | blocked | disabled` e attributi: programmazione, setpoint corrente, prossimo cambio, `override_until`, condizione attiva.
- Servizi: `set_profile`, `clear_override`, `enable`, `disable`.
- API websocket per la card: elenco e modifica di programmazioni, assegnazioni e condizioni. Config flow minimale (istanza unica); la gestione vera avviene dalla card, non dall'options flow (scelta mia).
- Persistenza con `helpers.storage.Store`.

## Vincoli tecnici (scelte mie)

- Backend Python (richiesto da Home Assistant). La logica di pianificazione e condizioni sta in un modulo puro senza import di HA, testabile con `pytest`.
- Card Lovelace in TypeScript + Lit, distribuita dallo stesso repository e registrata dall'integrazione come risorsa frontend, così HACS installa tutto con un solo passaggio.
- Interfaccia in italiano e inglese.
- Layout del repo: `custom_components/thermo_scheduler/`, `src/` (card), `tests/`, `hacs.json`.

## Dipendenze di sviluppo da approvare

Nessuna dipendenza runtime. In sviluppo: `pytest` e `pytest-homeassistant-custom-component` per il backend; `pnpm`, `lit`, `typescript` e un bundler (rollup o vite) per la card.

## Ordine di lavoro

1. Modulo puro (fasce, fascia corrente, prossimo cambio, valutazione condizioni, override) con test.
2. Integrazione HA: storage, timer, applicazione ai climate, override, condizioni, entità e servizi.
3. API websocket.
4. Card Lovelace.
5. Packaging HACS.

## Lasciato al costruttore

Nomi precisi di entità e servizi, struttura interna dei file, aspetto della card (minimal e pulito), gestione dei fusi orari tramite il fuso configurato in HA.
