import { LitElement, css, html, nothing } from "lit";
import { api, type Block, type Condition, type Data, type Profile } from "./api";
import { t } from "./i18n";

type View = "summary" | "settings" | "schedule" | "conditions";

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
    _editIndex: { state: true },
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
    .group { background: var(--ts-group); border-radius: 16px; overflow: hidden; }
    .group > * + * { border-top: 0.5px solid var(--ts-sep); }
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
      transition: background-color 200ms ease, transform 150ms ease, opacity 200ms ease;
    }
    button:active { transform: scale(0.98); }
    button:hover { opacity: 0.85; }
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

    /* riepilogo: una card che apre le impostazioni */
    .summary {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      width: 100%;
      min-height: 0;
      padding: 16px;
      border-radius: 20px;
      background: var(--ts-group);
      text-align: left;
      color: var(--ts-ink);
    }
    .summary:hover { opacity: 1; background: color-mix(in srgb, var(--ts-group) 92%, var(--ts-ink) 8%); }
    .sum-top { display: flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 600; }
    .sum-top span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sum-temp { font-size: 56px; line-height: 60px; font-weight: 300; margin-top: 8px; }
    .sum-temp small { font-size: 28px; vertical-align: top; margin-left: 2px; }
    .status-text { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: var(--tone, var(--ts-ink)); }
    .status-text ha-icon { color: var(--tone); }
    .next { font-size: 15px; color: var(--ts-ink2); margin-top: 4px; }

    /* barra superiore con indietro */
    .topbar { display: flex; align-items: center; gap: 8px; min-height: 44px; }
    .topbar h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .topbar .spacer { min-width: 44px; }
    .back { display: inline-flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; background: transparent; }

    /* impostazioni */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 0 4px; }
    .nav { width: 100%; justify-content: space-between; text-align: left; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; padding: 8px 16px; }
    .nav .value { color: var(--ts-ink2); font-size: 15px; }
    .stack { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; }
    .stack select { width: 100%; padding: 0; background: transparent; font-size: 17px; text-align: left; }

    /* programmazione: giorni e fasce */
    .week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      padding: 2px;
      border-radius: 10px;
      background: light-dark(#e9e9eb, #1c1c1e);
      min-height: 0;
    }
    .week button, .seg button {
      min-width: 0;
      min-height: 36px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      background: transparent;
      color: var(--ts-ink);
    }
    .week button[aria-pressed="true"], .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .slot { width: 100%; min-height: 56px; justify-content: flex-start; padding: 8px 16px; border-radius: 0; background: transparent; color: var(--ts-ink); font-weight: 400; }
    .slot .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); flex-shrink: 0; }
    .slot time { font-size: 17px; font-weight: 600; min-width: 56px; }
    .slot .mode { flex: 1; color: var(--ts-ink2); font-size: 15px; }
    .slot .temp { font-weight: 600; font-size: 17px; }
    .add { width: 100%; border-radius: 0; background: transparent; }
    .actions { display: flex; gap: 8px; }
    .actions button { flex: 1; }
    .stepper { display: inline-flex; align-items: center; gap: 4px; }
    .stepper button { min-width: 44px; font-size: 22px; line-height: 1; }
    .stepper output { min-width: 64px; text-align: center; font-size: 17px; font-weight: 600; }
    .seg { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; padding: 2px; margin: 12px 16px 4px; border-radius: 10px; background: light-dark(#e9e9eb, #1c1c1e); }
    .editor { display: flex; flex-direction: column; gap: 12px; }
    .editor input[type="text"], .editor input:not([type]) { flex: 1; width: 100%; }
    .switch-row { display: flex; align-items: center; gap: 8px; }

    /* condizioni */
    .cond-list .row > b { font-weight: 600; }
    .cond-list .meta { color: var(--ts-ink2); font-size: 15px; }
    .cond-editor { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    .cond-editor .row { padding: 0; min-height: 0; }

    .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; color: var(--ts-ink2); }
    .empty ha-icon { --mdc-icon-size: 36px; }

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
  _editIndex: number | null = null;
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
  private _name(id: string) { return this.hass.states[id]?.attributes?.friendly_name ?? id; }
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
    } catch {
      this._error = this._t("actionFailed");
    }
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
    const text = key === "override" ? `${this._t("override")} · ${this._status(cid)}` : this._status(cid);
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
      ${this._renderView()}
    </div>`;
  }

  private _renderView() {
    switch (this._view) {
      case "settings": return this._renderSettings();
      case "schedule": return this._renderSchedule();
      case "conditions": return this._renderConditions();
      default: return this._renderSummary();
    }
  }

  // riepilogo: stato, temperatura target e prossima fascia. Un tocco apre le impostazioni
  private _renderSummary() {
    const cid = this._selected;
    const a = this._data!.assignments[cid];
    const info = this._statusInfo(cid);
    const temp = this._targetTemp(cid);
    const next = a ? this._nextBlock(this._data!.profiles[a.profile_id]) : null;
    const names = this._dayNames();
    const prefix = next ? (next.k === 0 ? "" : next.k === 1 ? `${this._t("tomorrow")} ` : `${names[next.wd]} `) : "";
    return html`<button class="summary tone-${info.tone}" data-climate=${cid} aria-label=${`${this._name(cid)}: ${info.text}`}
        @click=${() => this._go("settings")}>
      <span class="sum-top"><span>${this._name(cid)}</span><ha-icon icon="mdi:chevron-right"></ha-icon></span>
      <span class="sum-temp" aria-label=${this._t("target")}>${temp == null ? "–" : this._fmt(temp)}<small>°</small></span>
      <span class="status-text tone-${info.tone}"><ha-icon icon=${info.icon}></ha-icon>${info.text}</span>
      ${!a ? html`<span class="next">${this._t("emptySchedule")}</span>` : nothing}
      ${next ? html`<span class="next">${this._t("next")} ${prefix}${next.block.start} · ${this._fmt(next.block.temperature)}°</span>` : nothing}
    </button>`;
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
      <div class="week" role="group" aria-label=${this._t("days")}>
        ${DAYS.map((d) => html`<button type="button" aria-pressed=${d === day} @click=${() => (this._scheduleDay = d)}>${names[d]}</button>`)}
      </div>
      <div class="group">
        ${rows.length ? rows.map(({ block, i }) => html`<button class="slot tone-${this._blockTone(block)}" @click=${() => (this._editIndex = i)}>
          <i class="dot"></i>
          <time datetime=${block.start}>${block.start}</time>
          <span class="mode">${block.hvac_mode ?? ""}</span>
          <span class="temp">${this._fmt(block.temperature)}°</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`) : html`<p class="footnote">${this._t("noBlocksDay")}</p>`}
        <button class="add" @click=${() => this._addBlock()}>${this._t("addBlock")}</button>
      </div>
      <div class="actions">
        <button class="primary" data-action="save-profile" @click=${() => this._saveProfile()}>${this._t("save")}</button>
        <button @click=${() => this._back()}>${this._t("cancel")}</button>
      </div>`;
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
        <div class="group">
          <div class="seg" role="group" aria-label=${this._t("days")}>
            ${DAYS.map((d) => html`<button type="button" aria-pressed=${b.days.includes(d)}
              @click=${() => this._patchProfile((x) => {
                const set = new Set(x.blocks[i].days);
                set.has(d) ? set.delete(d) : set.add(d);
                x.blocks[i].days = [...set].sort();
              })}>${names[d]}</button>`)}
          </div>
          <label class="row">
            <span>${this._t("start")}</span>
            <input type="time" .value=${b.start} @input=${(e: Event) => this._patchProfile((x) => (x.blocks[i].start = val(e)))} />
          </label>
          <div class="row">
            <span>${this._t("temperature")}</span>
            <div class="stepper">
              <button type="button" aria-label=${this._t("lower")} @click=${() => this._stepTemp(i, -TEMP_STEP)}>−</button>
              <output aria-live="polite">${this._fmt(b.temperature)}°</output>
              <button type="button" aria-label=${this._t("raise")} @click=${() => this._stepTemp(i, TEMP_STEP)}>+</button>
            </div>
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
