import { LitElement, css, html, nothing } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { api, type Block, type Condition, type Data, type Estimate, type LogEntry, type Profile, type Room } from "./api";
import { copyDay } from "./copy-day";
import { t } from "./i18n";

type View = "summary" | "settings" | "schedule" | "conditions" | "history";
type HistoryFilter = "all" | "manual" | "auto";

const val = (e: Event) => (e.target as HTMLInputElement).value;
const checked = (e: Event) => (e.target as HTMLInputElement).checked;
const newId = (prefix: string) => `${prefix}_${Date.now().toString(36)}`;

const DAYS = [0, 1, 2, 3, 4, 5, 6];
const TEMP_MIN = 5;
const TEMP_MAX = 30;
const TEMP_STEP = 0.5;
const clampTemp = (v: number) => Math.min(TEMP_MAX, Math.max(TEMP_MIN, Math.round(v / TEMP_STEP) * TEMP_STEP));
// lunedì = 0, come nei dati della programmazione
const todayIndex = () => (new Date().getDay() + 6) % 7;

class ThermoSchedulerCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _data: { state: true },
    _profile: { state: true },
    _condition: { state: true },
    _selected: { state: true },
    _view: { state: true },
    _scheduleDay: { state: true },
    _copyTargets: { state: true },
    _editIndex: { state: true },
    _modeOpen: { state: true },
    _est: { state: true },
    _history: { state: true },
    _historyFilter: { state: true },
    _room: { state: true },
    _error: { state: true },
  };
  static styles = css`
    :host {
      --ts-accent: var(--primary-color, #0062cc);
      --ts-heat: light-dark(#b35400, #ff9f0a);
      --ts-cool: light-dark(#0b6e99, #64d2ff);
      --ts-danger: light-dark(#c4252b, #ff6961);
      --ts-ink: var(--primary-text-color, #000);
      --ts-ink2: var(--secondary-text-color, #6e6e73);
      --ts-sep: var(--divider-color, rgba(128, 128, 128, 0.25));
      --ts-group: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--ts-ink) 6%);
      --ts-tile: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--ts-ink) 10%);
      --ts-ease: cubic-bezier(0.32, 0.72, 0, 1);
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      color: var(--ts-ink);
    }
    * { box-sizing: border-box; }
    .wrap { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    h3 {
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--ts-ink2);
      margin: 16px 4px 0;
    }
    .group { background: var(--ts-group); border-radius: 24px; overflow: hidden; }
    .group > * { position: relative; }
    .group > * + *::before {
      content: "";
      position: absolute;
      top: 0;
      left: 16px;
      right: 0;
      height: 0.5px;
      background: var(--ts-sep);
    }
    .row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      min-height: 44px;
      padding: 8px 16px;
      font-size: 17px;
      line-height: 22px;
      width: 100%;
    }
    .row > span:first-child { flex: 1; min-width: 0; }
    .footnote { margin: 0; padding: 8px 16px; font-size: 13px; line-height: 18px; color: var(--ts-ink2); }
    .caption { font-size: 13px; line-height: 18px; color: var(--ts-ink2); }

    button, select, input {
      font: inherit;
      color: inherit;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--ts-group);
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 44px;
      padding: 0 16px;
      color: var(--ts-accent);
      font-weight: 500;
      cursor: pointer;
      transition: background-color 250ms var(--ts-ease), transform 120ms var(--ts-ease), opacity 200ms var(--ts-ease);
      -webkit-tap-highlight-color: transparent;
    }
    button:active { transform: scale(0.97); }
    @media (hover: hover) { button:hover { opacity: 0.9; } }
    button.primary { background: var(--ts-accent); color: #fff; font-weight: 600; }
    button.danger { color: var(--ts-danger); }
    button.wide { width: 100%; }
    button.pill { min-height: 32px; padding: 0 12px; border-radius: 16px; font-size: 15px; }
    button.plain { background: transparent; padding: 0; min-width: 0; }
    select, input[type="text"], input:not([type]), input[type="time"], input[type="number"] {
      padding: 0 12px;
      min-width: 0;
    }
    input[type="checkbox"][role="switch"] {
      appearance: none;
      -webkit-appearance: none;
      width: 51px;
      height: 31px;
      min-height: 31px;
      margin: 0;
      padding: 0;
      border-radius: 16px;
      background: light-dark(#e9e9eb, #39393d);
      position: relative;
      cursor: pointer;
      transition: background-color 200ms ease;
      flex-shrink: 0;
    }
    input[type="checkbox"][role="switch"]::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 200ms ease;
    }
    input[type="checkbox"][role="switch"]:checked { background: var(--ts-accent); }
    input[type="checkbox"][role="switch"]:checked::after { transform: translateX(20px); }

    :focus-visible { outline: 2px solid var(--ts-accent); outline-offset: 2px; }
    ha-icon { --mdc-icon-size: 20px; color: var(--tone, var(--ts-ink2)); flex-shrink: 0; }
    .tone-heat { --tone: var(--ts-heat); }
    .tone-cool { --tone: var(--ts-cool); }
    .tone-accent { --tone: var(--ts-accent); }
    .tone-danger { --tone: var(--ts-danger); }
    .tone-off { --tone: var(--ts-ink2); }

    .banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 16px;
      background: color-mix(in srgb, var(--ts-danger) 12%, transparent);
      color: var(--ts-danger);
      font-size: 15px;
      line-height: 20px;
    }
    .banner span { flex: 1; }
    .banner ha-icon { color: var(--ts-danger); }

    /* riepilogo: hero con quadrante ad arco, pillola di stato e tile */
    .hero {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
      width: 100%;
      padding: 16px 16px 20px;
      border-radius: 28px;
      background: var(--ts-tile);
      color: var(--ts-ink);
      text-align: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
      transition: background-color 250ms var(--ts-ease);
    }
    .hero-top {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 32px;
      padding: 0;
      background: transparent;
      color: var(--ts-ink);
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.01em;
      text-align: left;
    }
    .hero-top .hero-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .hero-top ha-icon { color: var(--ts-ink2); }

    .dial {
      position: relative;
      display: block;
      width: min(220px, 70vw);
      aspect-ratio: 1;
      margin: 4px auto;
      --p: 0;
    }
    .ring, .knob-wrap {
      position: absolute;
      inset: 0;
    }
    .ring {
      border-radius: 50%;
      background: conic-gradient(var(--tone) calc(var(--p) * 270deg), var(--ts-sep) 0);
      transform: rotate(135deg);
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px));
      transition: background 250ms ease;
    }
    .knob-wrap { transform: rotate(calc(135deg + var(--p) * 270deg)); transition: transform 250ms ease; }
    .knob {
      position: absolute;
      top: 0;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 4px var(--tone), 0 1px 3px rgba(0, 0, 0, 0.25);
    }
    .dial-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .num { display: inline-flex; align-items: flex-start; font-size: 64px; line-height: 64px; font-weight: 300; letter-spacing: -0.03em; }
    .num sup { font-size: 26px; vertical-align: top; position: relative; top: -4px; margin-left: 1px; }
    .deg { font-size: 26px; line-height: 1; margin: 6px 0 0 4px; font-weight: 300; }
    .dial-mode { margin-top: 2px; font-size: 15px; color: var(--tone); font-weight: 600; }

    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      align-self: center;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 18px;
      font-size: 15px;
      font-weight: 600;
    }
    .status-pill { background: color-mix(in srgb, var(--tone) 14%, transparent); color: var(--tone); }
    .status-pill ha-icon { color: var(--tone); }

    .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; text-align: left; }
    .tile {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      min-height: 84px;
      padding: 12px 14px;
      text-align: left;
      flex-direction: column;
      gap: 2px;
      min-height: 84px;
      padding: 12px 14px;
      border-radius: 20px;
      background: var(--ts-group);
    }
    .tile ha-icon { margin-bottom: 4px; }
    .mode-tile { background: color-mix(in srgb, var(--tone) 16%, var(--ts-group)); }
    .mode-picker { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .mode-picker button {
      min-height: 40px;
      padding: 0 16px;
      border-radius: 20px;
      background: var(--ts-group);
      color: var(--ts-ink);
      font-weight: 500;
    }
    .mode-picker button[aria-pressed="true"] { background: var(--ts-accent); color: #fff; font-weight: 600; }
    .mode-tile ha-icon, .mode-tile .t-value { color: var(--tone); }
    .t-label { font-size: 13px; color: var(--ts-ink2); }
    .t-value { font-size: 17px; font-weight: 600; }
    .t-sub { font-size: 15px; color: var(--ts-ink2); }

    /* barra superiore con indietro */
    .topbar { display: flex; align-items: center; gap: 8px; min-height: 44px; }
    .topbar h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .topbar .spacer { min-width: 44px; }
    .back { display: inline-flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; background: transparent; }

    /* impostazioni */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 0 4px; }
    .nav { width: 100%; justify-content: space-between; text-align: left; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; padding: 8px 16px; }
    .nav .value { color: var(--ts-ink2); font-size: 15px; }
    .stack { display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; }
    .stack select { width: 100%; padding: 0; background: transparent; font-size: 17px; text-align: left; }

    /* programmazione: tab dei giorni, fasce come card, chip colorato */
    .tabs { display: grid; grid-template-columns: repeat(7, 1fr); }
    .tab {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      border-radius: 0;
      background: transparent;
      color: var(--ts-ink2);
      font-size: 14px;
      font-weight: 500;
      box-shadow: inset 0 -2px 0 var(--ts-sep);
    }
    .tab[aria-pressed="true"] { color: var(--ts-accent); font-weight: 600; box-shadow: inset 0 -3px 0 var(--ts-accent); }
    .copy-panel { margin-top: 8px; padding-bottom: 12px; }
    .copy-panel .presets { display: flex; gap: 8px; padding: 0 12px; flex-wrap: wrap; }
    .copy-panel .footnote { padding: 8px 16px 0; }
    .copy-panel .actions { padding: 0 12px; }
    .seg button:disabled { opacity: 0.35; }
    .slots { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
    .slot {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 64px;
      padding: 10px 16px;
      border-radius: 20px;
      background: var(--ts-tile);
      color: var(--ts-ink);
      font-weight: 400;
      text-align: left;
    }
    .slot .chip {
      min-width: 64px;
      padding: 6px 12px;
      border-radius: 14px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      background: color-mix(in srgb, var(--tone) 16%, transparent);
      color: var(--tone);
    }
    .slot .mode { flex: 1; min-width: 0; color: var(--ts-ink2); font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .slot time { font-size: 20px; font-weight: 500; }
    .slot ha-icon { color: var(--ts-ink2); }
    .add-pill {
      width: 100%;
      min-height: 52px;
      border-radius: 26px;
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--ts-sep);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .actions button.ghost { background: transparent; box-shadow: inset 0 0 0 1px var(--ts-sep); color: var(--ts-ink); }
    .actions button.primary { min-height: 52px; border-radius: 26px; }

    /* editor fascia: quadrante di temperatura e ora grande */
    .hero-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px 16px;
      border-radius: 28px;
      background: color-mix(in srgb, var(--tone) 12%, var(--ts-tile));
      --tone: var(--ts-heat);
    }
    .hero-slot.tone-cool { --tone: var(--ts-cool); }
    .stepper { display: flex; align-items: center; gap: 16px; }
    .stepper .big { min-width: 120px; text-align: center; font-size: 44px; font-weight: 300; }
    .round {
      width: 56px;
      height: 56px;
      min-width: 56px;
      padding: 0;
      border-radius: 50%;
      background: var(--ts-tile);
      font-size: 26px;
      line-height: 1;
      color: var(--ts-ink);
    }
    .time-field { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .big-time {
      min-height: 52px;
      font-size: 34px;
      font-weight: 300;
      background: transparent;
      text-align: center;
      padding: 0 8px;
    }
    .tile-group { overflow: visible; background: var(--ts-tile); }

    .seg button {
      min-width: 0;
      min-height: 40px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 14px;
      background: transparent;
      color: var(--ts-ink);
    }
    .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .seg { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; padding: 12px; background: transparent; }
    .editor { display: flex; flex-direction: column; gap: 12px; }
    .editor input[type="text"], .editor input:not([type]) { flex: 1; width: 100%; }
    .switch-row { display: flex; align-items: center; gap: 8px; }

    /* condizioni */
    .cond-list .row > b { font-weight: 600; }
    .cond-list .meta { color: var(--ts-ink2); font-size: 15px; }
    .cond-editor { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    .cond-editor .row { padding: 0; min-height: 0; }

    .seg.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .log-row { align-items: flex-start; padding: 12px 16px; }
    .log-row > .src:first-child { flex: 0 0 auto; min-width: 0; }
    .log-body { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
    .log-title { font-size: 16px; font-weight: 600; }
    .src { flex-shrink: 0; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; margin-top: 2px; }
    .src-manual { background: color-mix(in srgb, var(--ts-accent) 16%, transparent); color: var(--ts-accent); }
    .src-auto { background: color-mix(in srgb, var(--ts-heat) 16%, transparent); color: var(--ts-heat); }
    .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; color: var(--ts-ink2); }
    .empty ha-icon { --mdc-icon-size: 36px; }

    @keyframes ts-enter {
      from { opacity: 0; transform: translateX(16px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .view-in { animation: ts-enter 250ms var(--ts-ease) both; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
    @media (max-width: 360px) {
      .wrap { padding: 12px; }
      .sum-temp { font-size: 48px; line-height: 52px; }
    }
  `;

  hass: any;
  _config: { entity?: string } = {};
  _data: Data | null = null;
  _profile: Profile | null = null;
  _condition: Condition | null = null;
  _selected = "";
  _view: View = "summary";
  _scheduleDay = todayIndex();
  _copyTargets: number[] | null = null; // null = pannello di copia chiuso
  _editIndex: number | null = null;
  _modeOpen = false;
  _est: Estimate | null = null;
  _history: LogEntry[] | null = null;
  _historyFilter: HistoryFilter = "all";
  _room: Room | null = null; // bozza della sezione Casa, finché non si salva
  private _estKey = "";
  _error = "";
  private _retry: (() => Promise<unknown>) | null = null;
  private _loaded = false;

  // la card mostra un solo termostato, scelto nella configurazione
  setConfig(config: { entity?: string }) {
    if (!config?.entity?.startsWith("climate.")) {
      throw new Error("thermo-scheduler-card: imposta 'entity' con un termostato climate.*");
    }
    this._config = config;
    this._selected = config.entity;
    this._syncProfile();
  }
  getCardSize() { return 3; }

  updated() {
    if (!this._data || !this.hass) return;
    this._maybeEstimate();
  }

  // tempo di riscaldamento per la prossima fascia; ricalcolato ogni 10 minuti o al cambio di fascia
  private _maybeEstimate() {
    const cid = this._selected;
    const a = this._data!.assignments[cid];
    const next = a ? this._nextBlock(this._data!.profiles[a.profile_id]) : null;
    if (!next) {
      this._est = null;
      this._estKey = "";
      return;
    }
    const bucket = Math.floor(Date.now() / 600000);
    const key = `${cid}|${next.block.temperature}|${next.at.getTime()}|${bucket}`;
    if (key === this._estKey) return;
    this._estKey = key;
    this._api
      .estimate(cid, next.block.temperature)
      .then((est) => {
        if (this._estKey === key) this._est = est;
      })
      .catch(() => {
        if (this._estKey === key) this._est = null;
      });
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass && !this._loaded) {
      this._loaded = true;
      this._reload();
    }
  }

  private get _api() { return api((msg) => this.hass.callWS(msg)); }
  private _t(key: string, vars?: Record<string, string | number>) { return t(this.hass?.language, key, vars); }
  private async _reload() {
    this._data = await this._api.list();
    if (!this._selected) this._selected = Object.keys(this._data.assignments)[0] ?? "";
    this._syncProfile();
  }
  // solo il friendly name; senza, il nome dell'entità senza dominio (es. "Bagno giorno")
  private _name(id: string) {
    const friendly = this.hass.states[id]?.attributes?.friendly_name;
    if (friendly) return friendly;
    const object = id.split(".")[1] ?? id;
    return object.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
  }
  private _users(profileId: string) {
    return Object.entries(this._data!.assignments).filter(([, a]) => a.profile_id === profileId).map(([id]) => id);
  }
  // l'editor mostra sempre la programmazione del termostato selezionato
  private _syncProfile() {
    const a = this._data?.assignments[this._selected];
    if (!a) this._profile = null;
    else if (this._profile?.id !== a.profile_id) this._profile = structuredClone(this._data!.profiles[a.profile_id]);
  }
  _select(id: string) {
    this._selected = id;
    this._room = null;
    this._profile = null;
    this._syncProfile();
  }
  private async _makeOwn(cid: string) {
    const a = this._data!.assignments[cid];
    const blocks = a ? structuredClone(this._data!.profiles[a.profile_id].blocks) : [];
    const profile = { id: newId("p"), name: this._name(cid), blocks };
    await this._api.saveProfile(profile);
    await this._api.assign(cid, profile.id);
  }
  private async _do(fn: () => Promise<unknown>) { await fn(); await this._reload(); }

  // come _do, ma tiene l'azione per "Riprova" e mostra l'errore invece di lanciarlo
  private async _try(fn: () => Promise<unknown>) {
    this._retry = fn;
    this._error = "";
    try {
      await this._do(fn);
    } catch (err) {
      const message = (err as { message?: string })?.message;
      this._error = message || this._t("actionFailed");
    }
  }

  // cambio modalità: come una modifica manuale, quindi crea un override
  private async _setMode(cid: string, mode: string) {
    this._modeOpen = false;
    try {
      await this.hass.callService("climate", "set_hvac_mode", { entity_id: cid, hvac_mode: mode });
    } catch (err) {
      this._error = (err as { message?: string })?.message || this._t("actionFailed");
    }
  }
  private _modeName(mode: string) {
    const keys: Record<string, string> = { heat: "heating", cool: "cooling", off: "off", auto: "auto", heat_cool: "auto", dry: "dry", fan_only: "fan" };
    return this._t(keys[mode] ?? mode);
  }

  // navigazione: stato di sola UI
  private _go(view: View) {
    this._view = view;
    if (view !== "schedule") this._editIndex = null;
  }
  private _openSchedule() {
    this._syncProfile();
    this._scheduleDay = todayIndex();
    this._editIndex = null;
    this._view = "schedule";
  }
  // indietro: chiude prima l'editor della fascia, poi discarge le modifiche non salvate
  private _back() {
    if (this._view === "schedule" && this._editIndex !== null) {
      this._editIndex = null;
      return;
    }
    if (this._view === "schedule") {
      this._profile = null;
      this._syncProfile();
      this._go("settings");
      return;
    }
    this._go(this._view === "settings" ? "summary" : "settings");
  }
  private async _saveProfile() {
    const profile = this._profile!;
    await this._try(() => this._api.saveProfile(profile));
    if (!this._error) this._go("settings");
  }

  private _status(climateId: string): string {
    const sensor = this.hass.states[`sensor.${climateId.split(".")[1]}_scheduler`];
    if (!sensor) return "";
    if (sensor.state === "override") {
      return this._t("until", { t: String(sensor.attributes.override_until ?? "").slice(11, 16) });
    }
    return this._t(sensor.state);
  }
  private _sensorState(climateId: string): string {
    return this.hass.states[`sensor.${climateId.split(".")[1]}_scheduler`]?.state ?? "";
  }
  private _hvac(climateId: string): string {
    return this.hass.states[climateId]?.state ?? "off";
  }
  private _targetTemp(climateId: string): number | null {
    const v = this.hass.states[climateId]?.attributes?.temperature;
    return v == null ? null : Number(v);
  }
  private _fmt(v: number | string) {
    return new Intl.NumberFormat(this.hass?.language ?? "en", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number(v));
  }
  private _dayNames(): string[] { return this._t("days").split(","); }
  // "Lun–Ven" per le sequenze consecutive, "Sab, Dom" per il resto
  private _dayList(days: number[]) {
    const names = this._dayNames();
    const sorted = [...days].sort((a, b) => a - b);
    const runs: number[][] = [];
    for (const d of sorted) {
      const last = runs[runs.length - 1];
      if (last && d === last[last.length - 1] + 1) last.push(d);
      else runs.push([d]);
    }
    return runs.map((r) => (r.length > 2 ? `${names[r[0]]}–${names[r[r.length - 1]]}` : r.map((d) => names[d]).join(", "))).join(", ");
  }
  private _blockTone(b: Block) { return b.hvac_mode === "cool" ? "cool" : "heat"; }

  // stato del termostato: testo, icona e colore, sempre insieme
  private _statusInfo(cid: string) {
    const key = this._sensorState(cid);
    const hvac = this._hvac(cid);
    const tone = key === "blocked" ? "danger" : key === "override" ? "accent" : key === "disabled" ? "off" : hvac === "cool" ? "cool" : "heat";
    const icons: Record<string, string> = {
      override: "mdi:hand-back-left",
      blocked: "mdi:lock",
      disabled: "mdi:pause-circle-outline",
      scheduled: "mdi:calendar-clock",
    };
    let text = key === "override" ? `${this._t("override")} · ${this._status(cid)}` : this._status(cid);
    if (this.hass.states[`sensor.${cid.split(".")[1]}_scheduler`]?.attributes?.preheating) {
      text = `${text} · ${this._t("preheating")}`;
    }
    return { key, tone, icon: icons[key] ?? "mdi:thermostat", text };
  }

  // prima fascia futura, cercata nei prossimi 8 giorni
  private _nextBlock(profile: Profile | undefined) {
    if (!profile || !profile.blocks.length) return null;
    const now = new Date();
    for (let k = 0; k < 8; k++) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k);
      const wd = (day.getDay() + 6) % 7;
      let best: { at: Date; block: Block } | null = null;
      for (const block of profile.blocks) {
        if (!block.days.includes(wd)) continue;
        const [h, m] = block.start.split(":").map(Number);
        const at = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
        if (at > now && (!best || at < best.at)) best = { at, block };
      }
      if (best) return { ...best, k, wd };
    }
    return null;
  }

  render() {
    if (!this._data) return nothing;
    return html`<div class="wrap">
      ${this._error ? html`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${() => this._retry && this._try(this._retry)}>${this._t("retry")}</button>
      </div>` : nothing}
      ${keyed(this._view, html`<div class="view-in">${this._renderView()}</div>`)}
    </div>`;
  }

  private _renderView() {
    switch (this._view) {
      case "settings": return this._renderSettings();
      case "schedule": return this._renderSchedule();
      case "conditions": return this._renderConditions();
      case "history": return this._renderHistory();
      default: return this._renderSummary();
    }
  }

  // temperatura spezzata in parte intera e decimale, per mostrare il decimale in apice
  private _tempParts(v: number) {
    const parts = new Intl.NumberFormat(this.hass?.language ?? "en", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).formatToParts(v);
    const int = parts.filter((x) => x.type === "integer" || x.type === "group" || x.type === "minusSign").map((x) => x.value).join("");
    const dec = parts.filter((x) => x.type === "decimal" || x.type === "fraction").map((x) => x.value).join("");
    return { int, dec };
  }
  private _modeLabel(cid: string) {
    const h = this._hvac(cid);
    return h === "cool" ? this._t("cooling") : h === "heat" ? this._t("heating") : this._t("off");
  }

  // riepilogo: quadrante con la temperatura target, stato, modalità e prossima fascia.
  // Un tocco sull'intera card apre le impostazioni.
  private _renderSummary() {
    const cid = this._selected;
    const a = this._data!.assignments[cid];
    const info = this._statusInfo(cid);
    const temp = this._targetTemp(cid);
    const parts = temp == null ? null : this._tempParts(temp);
    const pct = temp == null ? 0 : Math.min(1, Math.max(0, (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)));
    const next = a ? this._nextBlock(this._data!.profiles[a.profile_id]) : null;
    const names = this._dayNames();
    const prefix = next ? (next.k === 0 ? "" : next.k === 1 ? `${this._t("tomorrow")} ` : `${names[next.wd]} `) : "";
    const hvac = this._hvac(cid);
    const hvacTone = hvac === "cool" ? "cool" : hvac === "heat" ? "heat" : "off";
    const modes: string[] = this.hass.states[cid]?.attributes?.hvac_modes ?? [];
    return html`<section class="hero tone-${hvacTone}" data-climate=${cid}>
      <button class="hero-top" aria-label=${`${this._t("settings")}: ${this._name(cid)}`} @click=${() => this._go("settings")}>
        <span class="hero-name">${this._name(cid)}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
      </button>
      <span class="dial" style="--p: ${pct}" role="img" aria-label=${`${this._t("target")} ${temp == null ? "–" : this._fmt(temp)} °`}>
        <span class="ring"></span>
        <span class="knob-wrap"><span class="knob"></span></span>
        <span class="dial-center">
          <span class="num">${parts ? parts.int : "–"}${parts && parts.dec ? html`<sup>${parts.dec}</sup>` : nothing}<span class="deg">°</span></span>
          <span class="dial-mode">${this._modeLabel(cid)}</span>
        </span>
      </span>
      <span class="pill status-pill tone-${info.tone}"><ha-icon icon=${info.icon}></ha-icon>${info.text}</span>
      <span class="tiles">
        <button class="tile mode-tile" aria-expanded=${this._modeOpen} aria-controls="mode-picker"
          @click=${() => (this._modeOpen = !this._modeOpen)}>
          <ha-icon icon=${hvac === "cool" ? "mdi:snowflake" : "mdi:fire"}></ha-icon>
          <span class="t-label">${this._t("mode")}</span>
          <span class="t-value">${this._modeLabel(cid)}</span>
        </button>
        ${next ? html`<span class="tile">
          <span class="t-label">${this._t("next")}</span>
          <span class="t-value">${prefix}${next.block.start}</span>
          <span class="t-sub">${this._fmt(next.block.temperature)}°</span>
          ${this._estimateLine(next)}
        </span>` : nothing}
      </span>
      ${this._modeOpen && modes.length ? html`<div id="mode-picker" class="mode-picker" role="group" aria-label=${this._t("changeMode")}>
        ${modes.map((m) => html`<button type="button" aria-pressed=${m === hvac} @click=${() => this._setMode(cid, m)}>${this._modeName(m)}</button>`)}
      </div>` : nothing}
      ${!a ? html`<span class="footnote">${this._t("emptySchedule")}</span>` : nothing}
    </section>`;
  }

  private _estimateLine(next: { at: Date; block: Block }) {
    const est = this._est;
    if (!est) return nothing;
    if (est.minutes == null) {
      const reasons: Record<string, string> = { inside: "noInside", outdoor: "noOutdoor", unreachable: "unreachable" };
      return html`<span class="t-sub est-warn">${this._t(reasons[est.reason ?? "unreachable"])}</span>`;
    }
    const start = new Date(next.at.getTime() - est.minutes * 60000);
    const time = start.toLocaleTimeString(this.hass?.language ?? "en", { hour: "2-digit", minute: "2-digit" });
    // dettagli sulla stima nel titolo: la tile resta corta
    const note = est.configured ? (est.samples ? this._t("calibrated", { x: est.samples }) : "") : this._t("genericEstimate");
    return html`<span class="t-sub est" title=${note}>${this._t("startAt")} ${time}</span>
      <span class="t-sub">${this._t("estMinutes", { x: est.minutes })}</span>`;
  }

  // casa: impianto, caldaia, classe energetica, metratura; servono alla stima
  private _roomView(cid: string): Room {
    return this._room ?? this._data!.rooms?.[cid] ?? { area_m2: 20, height_m: 2.7 };
  }
  private _patchRoom(cid: string, patch: Partial<Room>) {
    this._room = { ...this._roomView(cid), ...patch };
  }
  // stanza: superficie e altezza; impianto, caldaia e classe sono nelle impostazioni dell'integrazione
  private _renderHouse(cid: string) {
    const r = this._roomView(cid);
    return html`<h3>${this._t("house")}</h3>
      <div class="group tile-group">
        <label class="row"><span>${this._t("area")}</span>
          <input type="number" min="5" max="500" step="1" .value=${String(r.area_m2)} @change=${(e: Event) => this._patchRoom(cid, { area_m2: Number(val(e)) })} /></label>
        <label class="row"><span>${this._t("height")}</span>
          <input type="number" min="2" max="6" step="0.1" .value=${String(r.height_m)} @change=${(e: Event) => this._patchRoom(cid, { height_m: Number(val(e)) })} /></label>
        <label class="row"><span>${this._t("preheat")}</span>
          <input type="checkbox" role="switch" data-action="preheat" .checked=${(this._data!.preheat ?? []).includes(cid)}
            @change=${(e: Event) => this._try(() => this._api.setPreheat(cid, checked(e)))} /></label>
        <p class="footnote">${this._t("preheatHint")}</p>
        <p class="footnote">${this._t("houseHint")}</p>
        <button class="nav" data-action="save-room" @click=${() => this._saveRoom(cid)}>${this._t("saveHouse")}</button>
      </div>`;
  }
  private async _saveRoom(cid: string) {
    const room = this._roomView(cid);
    await this._try(() => this._api.setRoom(cid, room));
    if (!this._error) this._room = null;
  }

  private _renderSettings() {
    const d = this._data!;
    const cid = this._selected;
    const a = d.assignments[cid];
    const others = a ? this._users(a.profile_id).filter((id) => id !== cid) : [];
    const info = this._statusInfo(cid);
    return html`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${() => this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._name(cid)}</h2>
        <span class="spacer"></span>
      </div>
      <div class="status tone-${info.tone}" data-climate=${cid}>
        <span class="status-text"><ha-icon icon=${info.icon}></ha-icon>${info.text}</span>
        ${info.key === "override" ? html`<button class="pill" data-action="clear-override"
          @click=${() => this._try(() => this._api.clearOverride(cid))}>${this._t("clearOverride")}</button>` : nothing}
      </div>
      ${a ? html`<div class="group">
        <label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${a.enabled}
            @change=${(e: Event) => this._try(() => this._api.assign(cid, a.profile_id, { enabled: checked(e) }))} />
        </label>
        <button class="nav" data-action="open-schedule" @click=${() => this._openSchedule()}>
          <span>${this._t("timeSlots")}</span><span class="value">${d.profiles[a.profile_id].name}</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
        <button class="nav" data-action="conditions" @click=${() => this._go("conditions")}>
          <span>${this._t("conditions")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
        <button class="nav" data-action="history" @click=${() => this._openHistory()}>
          <span>${this._t("history")}</span><ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>` : nothing}
      <div class="group">
        <div class="stack">
          <span class="caption">${this._t("schedule")}</span>
          <select data-action="link" @change=${(e: Event) => val(e) && this._try(() => this._api.assign(cid, val(e)))}>
            ${a ? nothing : html`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(d.profiles).map((p) => html`<option value=${p.id} ?selected=${p.id === a?.profile_id}>${p.name} (${this._users(p.id).map((id) => this._name(id)).join(", ") || "-"})</option>`)}
          </select>
        </div>
        <button class="nav" data-action="own" @click=${() => this._try(() => this._makeOwn(cid))}>${this._t("ownSchedule")}</button>
        ${others.length ? html`<p class="footnote">${this._t("sharedWith", { x: others.map((id) => this._name(id)).join(", ") })}</p>` : nothing}
      </div>
      ${this._renderHouse(cid)}
      ${a ? html`<div class="group">
        <button class="nav danger" @click=${() => this._try(() => this._api.unassign(cid))}>${this._t("unassign")}</button>
      </div>` : nothing}`;
  }

  // programmazione: giorni in alto, fasce del giorno scelto, editor di una fascia
  private _renderSchedule() {
    const p = this._profile;
    if (!p) {
      return html`<div class="topbar">
          <button class="back" @click=${() => this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
          <h2>${this._t("timeSlots")}</h2><span class="spacer"></span>
        </div>
        <div class="group"><div class="empty"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon><p>${this._t("emptySchedule")}</p></div></div>`;
    }
    if (this._editIndex !== null && p.blocks[this._editIndex]) return this._renderSlotEditor(this._editIndex);

    const names = this._dayNames();
    const day = this._scheduleDay;
    const rows = p.blocks
      .map((block, i) => ({ block, i }))
      .filter(({ block }) => block.days.includes(day))
      .sort((x, y) => x.block.start.localeCompare(y.block.start));
    return html`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${() => this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${p.name}</h2><span class="spacer"></span>
      </div>
      <div class="tabs" role="group" aria-label=${this._t("days")}>
        ${DAYS.map((d) => html`<button type="button" class="tab" aria-pressed=${d === day} @click=${() => { this._scheduleDay = d; this._copyTargets = null; }}>${names[d]}</button>`)}
      </div>
      <div class="slots">
        ${rows.length ? rows.map(({ block, i }) => html`<button class="slot tone-${this._blockTone(block)}" @click=${() => (this._editIndex = i)}>
          <span class="chip">${this._fmt(block.temperature)}°</span>
          <span class="mode">${block.hvac_mode ?? this._dayList(block.days)}</span>
          <time datetime=${block.start}>${block.start}</time>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`) : html`<p class="footnote">${this._t("noBlocksDay")}</p>`}
        <button class="add-pill" @click=${() => this._addBlock()}><ha-icon icon="mdi:plus"></ha-icon>${this._t("addBlock")}</button>
        ${this._renderCopy(day, rows.length > 0)}
      </div>
      <div class="actions">
        <button class="primary" data-action="save-profile" @click=${() => this._saveProfile()}>${this._t("save")}</button>
        <button class="ghost" @click=${() => this._back()}>${this._t("cancel")}</button>
      </div>`;
  }

  // copia la giornata scelta su altri giorni (sostituisce le fasce presenti)
  private _renderCopy(day: number, hasSlots: boolean) {
    const targets = this._copyTargets;
    if (!targets) {
      return hasSlots
        ? html`<button class="add-pill" data-action="copy-day" @click=${() => (this._copyTargets = [])}><ha-icon icon="mdi:content-copy"></ha-icon>${this._t("copyDay")}</button>`
        : nothing;
    }
    const names = this._dayNames();
    const toggle = (d: number) => (this._copyTargets = targets.includes(d) ? targets.filter((x) => x !== d) : [...targets, d]);
    const preset = (list: number[]) => (this._copyTargets = list.filter((d) => d !== day));
    return html`<div class="group copy-panel" data-role="copy-panel">
      <div class="stack"><span class="caption">${this._t("copyDayTo", { x: names[day] })}</span></div>
      <div class="seg" role="group" aria-label=${this._t("days")}>
        ${DAYS.map((d) => html`<button type="button" data-day=${d} ?disabled=${d === day} aria-pressed=${targets.includes(d)} @click=${() => toggle(d)}>${names[d]}</button>`)}
      </div>
      <div class="presets">
        <button type="button" class="ghost" @click=${() => preset([0, 1, 2, 3, 4])}>${this._t("weekdays")}</button>
        <button type="button" class="ghost" @click=${() => preset([5, 6])}>${this._t("weekend")}</button>
        <button type="button" class="ghost" @click=${() => preset(DAYS)}>${this._t("allDays")}</button>
      </div>
      <p class="footnote">${this._t("copyDayHint")}</p>
      <div class="actions">
        <button class="primary" data-action="apply-copy" ?disabled=${!targets.length} @click=${() => this._applyCopy(day, targets)}>${this._t("apply")}</button>
        <button class="ghost" @click=${() => (this._copyTargets = null)}>${this._t("cancel")}</button>
      </div>
    </div>`;
  }

  private _applyCopy(day: number, targets: number[]) {
    this._patchProfile((x) => (x.blocks = copyDay(x.blocks, day, targets)));
    this._copyTargets = null;
  }

  private _addBlock() {
    this._patchProfile((x) => x.blocks.push({ days: [this._scheduleDay], start: "06:30", temperature: 20, hvac_mode: null }));
    this._editIndex = this._profile!.blocks.length - 1;
  }

  private _renderSlotEditor(i: number) {
    const b = this._profile!.blocks[i];
    const names = this._dayNames();
    return html`<div class="topbar">
        <button class="back" @click=${() => (this._editIndex = null)}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("timeSlots")}</button>
        <h2>${this._t("slot")}</h2><span class="spacer"></span>
      </div>
      <div class="editor">
        <div class="hero-slot tone-${this._blockTone(b)}">
          <div class="stepper">
            <button type="button" class="round" aria-label=${this._t("lower")} @click=${() => this._stepTemp(i, -TEMP_STEP)}>−</button>
            <output class="big" aria-live="polite">${this._fmt(b.temperature)}°</output>
            <button type="button" class="round" aria-label=${this._t("raise")} @click=${() => this._stepTemp(i, TEMP_STEP)}>+</button>
          </div>
          <label class="time-field">
            <span class="caption">${this._t("start")}</span>
            <input type="time" class="big-time" .value=${b.start} @input=${(e: Event) => this._patchProfile((x) => (x.blocks[i].start = val(e)))} />
          </label>
        </div>
        <div class="group tile-group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${DAYS.map((d) => html`<button type="button" aria-pressed=${b.days.includes(d)}
              @click=${() => this._patchProfile((x) => {
                const set = new Set(x.blocks[i].days);
                set.has(d) ? set.delete(d) : set.add(d);
                x.blocks[i].days = [...set].sort();
              })}>${names[d]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("mode")}</span>
            <input type="text" .value=${b.hvac_mode ?? ""} placeholder=${this._t("mode")}
              @input=${(e: Event) => this._patchProfile((x) => (x.blocks[i].hvac_mode = val(e) || null))} />
          </label>
        </div>
        <button class="danger wide" @click=${() => { this._patchProfile((x) => x.blocks.splice(i, 1)); this._editIndex = null; }}>${this._t("removeBlock")}</button>
        <button class="primary wide" @click=${() => (this._editIndex = null)}>${this._t("done")}</button>
      </div>`;
  }

  private _patchProfile(fn: (p: Profile) => void) {
    const copy = structuredClone(this._profile!);
    fn(copy);
    this._profile = copy;
  }

  private _stepTemp(i: number, delta: number) {
    this._patchProfile((p) => (p.blocks[i].temperature = clampTemp(p.blocks[i].temperature + delta)));
  }

  private _actionLabel(c: Condition) {
    return c.action.kind === "off" ? this._t("actionOff") : this._t("actionMin", { x: c.action.temperature ?? "" });
  }

  private _patchCondition(fn: (c: Condition) => void) {
    const copy = structuredClone(this._condition!);
    fn(copy);
    this._condition = copy;
  }

  private _openHistory() {
    this._historyFilter = "all";
    this._go("history");
    this._loadHistory();
  }
  private async _loadHistory() {
    this._history = null;
    try {
      this._history = await this._api.log(200);
    } catch (err) {
      this._history = [];
      this._error = (err as { message?: string })?.message || this._t("actionFailed");
    }
  }

  // testo leggibile per l'azione registrata (manuale o automatica)
  private _logTitle(e: LogEntry) {
    if (e.action.startsWith("servizio ")) return `${this._t("logService")}: ${e.action.slice(9)}`;
    const known = new Set(["save_profile", "delete_profile", "save_condition", "delete_condition", "assign", "unassign", "clear_override", "set_room", "set_preheat", "override", "override_scaduto", "ciclo_appreso", "condizione_attiva", "condizione_finita", "fascia", "preriscaldamento"]);
    return known.has(e.action) ? this._t(`log_${e.action}`) : e.action;
  }

  private _renderHistory() {
    const filter = this._historyFilter;
    const entries = (this._history ?? []).filter((e) => filter === "all" || e.source === filter).slice().reverse();
    const filters: [HistoryFilter, string][] = [["all", "logAll"], ["manual", "logManual"], ["auto", "logAuto"]];
    return html`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${() => this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("history")}</h2>
        <button class="pill" @click=${() => this._loadHistory()}>${this._t("refresh")}</button>
      </div>
      <div class="seg three" role="group" aria-label=${this._t("history")}>
        ${filters.map(([f, key]) => html`<button type="button" aria-pressed=${f === filter} @click=${() => (this._historyFilter = f)}>${this._t(key)}</button>`)}
      </div>
      <div class="group">
        ${this._history === null ? html`<p class="footnote">…</p>`
          : entries.length ? entries.map((e) => html`<div class="row log-row">
              <span class="src src-${e.source}">${this._t(e.source === "manual" ? "logManual" : "logAuto")}</span>
              <span class="log-body">
                <span class="log-title">${this._logTitle(e)}</span>
                <span class="t-sub">${this._logTime(e.ts)}${e.climate ? ` · ${this._name(e.climate)}` : ""}</span>
                ${e.detail ? html`<span class="t-sub">${e.detail}</span>` : nothing}
              </span>
            </div>`)
          : html`<p class="footnote">${this._t("noHistory")}</p>`}
      </div>`;
  }
  private _logTime(ts: string) {
    const date = new Date(ts);
    return date.toLocaleString(this.hass?.language ?? "en", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  private _renderConditions() {
    const d = this._data!;
    const cid = this._selected;
    const a = d.assignments[cid];
    return html`<div class="topbar">
        <button class="back" aria-label=${this._t("back")} @click=${() => this._back()}><ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("back")}</button>
        <h2>${this._t("conditions")}</h2><span class="spacer"></span>
      </div>
      <div class="group cond-list">
        ${Object.values(d.conditions).map((c) => html`<div class="row">
          <b>${c.name}</b>
          <span class="meta">${c.checks.map((k) => `${k.entity_id} ${k.op} ${k.value}`).join(c.match === "all" ? " & " : " | ")}</span>
          <span class="meta">${this._t("delaySec", { x: c.delay })}</span>
          <span class="meta">${this._actionLabel(c)}</span>
          ${a ? html`<label class="switch-row"><span class="caption">${this._t("forThis")}</span>
            <input type="checkbox" role="switch" aria-label=${`${c.name}: ${this._name(cid)}`} .checked=${a.condition_ids.includes(c.id)}
              @change=${(e: Event) => this._try(() => this._api.assign(cid, a.profile_id, {
                condition_ids: checked(e) ? [...a.condition_ids, c.id] : a.condition_ids.filter((x) => x !== c.id),
              }))} /></label>` : nothing}
          <button class="pill" @click=${() => (this._condition = structuredClone(c))}>${this._t("edit")}</button>
          <button class="pill danger" @click=${() => this._try(() => this._api.deleteCondition(c.id))}>${this._t("delete")}</button>
        </div>`)}
        <div class="row">
          <button class="wide" @click=${() => (this._condition = { id: newId("c"), name: "", checks: [], match: "all", delay: 120, action: { kind: "off", temperature: null } })}>${this._t("newCondition")}</button>
        </div>
      </div>
      ${this._condition ? html`<div class="group cond-editor">
        <input type="text" .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${(e: Event) => this._patchCondition((c) => (c.name = val(e)))} />
        <select @change=${(e: Event) => this._patchCondition((c) => (c.match = val(e) as "all" | "any"))}>
          <option value="all" ?selected=${this._condition.match === "all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match === "any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((k, i) => html`<div class="row">
          <input type="text" placeholder=${this._t("entity")} .value=${k.entity_id} @input=${(e: Event) => this._patchCondition((c) => (c.checks[i].entity_id = val(e)))} />
          <select @change=${(e: Event) => this._patchCondition((c) => (c.checks[i].op = val(e) as "=" | "!=" | ">" | "<"))}>
            ${["=", "!=", ">", "<"].map((op) => html`<option ?selected=${k.op === op}>${op}</option>`)}
          </select>
          <input type="text" placeholder=${this._t("value")} .value=${k.value} @input=${(e: Event) => this._patchCondition((c) => (c.checks[i].value = val(e)))} />
          <button class="pill danger" @click=${() => this._patchCondition((c) => c.checks.splice(i, 1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${() => this._patchCondition((c) => c.checks.push({ entity_id: "", op: "=", value: "on" }))}>${this._t("addCheck")}</button>
        <div class="row">
          <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")} aria-label=${this._t("delay")}
            @input=${(e: Event) => this._patchCondition((c) => (c.delay = Number(val(e))))} />
          <select @change=${(e: Event) => this._patchCondition((c) => (c.action.kind = val(e) as "off" | "min_setpoint"))}>
            <option value="off" ?selected=${this._condition.action.kind === "off"}>${this._t("actionOff")}</option>
            <option value="min_setpoint" ?selected=${this._condition.action.kind === "min_setpoint"}>${this._t("actionMin", { x: "" })}</option>
          </select>
          ${this._condition.action.kind === "min_setpoint" ? html`<input type="number" step="0.5" .value=${String(this._condition.action.temperature ?? 12)}
            @input=${(e: Event) => this._patchCondition((c) => (c.action.temperature = Number(val(e))))} />` : nothing}
        </div>
        <div class="actions">
          <button class="primary" data-action="save-condition" @click=${() => this._try(async () => { await this._api.saveCondition(this._condition!); this._condition = null; })}>${this._t("save")}</button>
          <button @click=${() => (this._condition = null)}>${this._t("cancel")}</button>
        </div>
      </div>` : nothing}`;
  }
}

customElements.define("thermo-scheduler-card", ThermoSchedulerCard);
(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push({
  type: "thermo-scheduler-card",
  name: "Thermo Scheduler",
  description: "Stato, prossima fascia e programmazione di un termostato",
});
