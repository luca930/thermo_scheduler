import { LitElement, css, html, nothing } from "lit";
import { api, type Block, type Condition, type Data, type Profile } from "./api";
import { t } from "./i18n";

const val = (e: Event) => (e.target as HTMLInputElement).value;
const checked = (e: Event) => (e.target as HTMLInputElement).checked;
const newId = (prefix: string) => `${prefix}_${Date.now().toString(36)}`;

const DAYS = [0, 1, 2, 3, 4, 5, 6];
const TEMP_MIN = 5;
const TEMP_MAX = 30;
const TEMP_STEP = 0.5;
const clampTemp = (v: number) => Math.min(TEMP_MAX, Math.max(TEMP_MIN, Math.round(v / TEMP_STEP) * TEMP_STEP));

class ThermoSchedulerCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _data: { state: true },
    _profile: { state: true },
    _condition: { state: true },
    _selected: { state: true },
    _configuring: { state: true },
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
    .wrap { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    h3 {
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--ts-ink2);
      margin: 24px 4px 4px;
    }
    .group {
      background: var(--ts-group);
      border-radius: 16px;
      overflow: hidden;
    }
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
    }
    .row > span:first-child { flex: 1; min-width: 0; }
    .footnote { margin: 0; padding: 8px 16px; font-size: 13px; line-height: 18px; color: var(--ts-ink2); }

    button, select, input {
      font: inherit;
      color: inherit;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--ts-group);
    }
    button {
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
    select, input[type="text"], input:not([type]), input[type="time"], input[type="number"] {
      padding: 0 12px;
      min-width: 0;
    }
    select.picker {
      width: 100%;
      min-height: 44px;
      font-size: 17px;
      font-weight: 600;
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
    .banner button { min-height: 32px; }

    /* stato del termostato */
    .status { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 4px 4px 0; }
    .status-text { display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 600; }
    .tone-heat { --tone: var(--ts-heat); }
    .tone-cool { --tone: var(--ts-cool); }
    .tone-accent { --tone: var(--ts-accent); }
    .tone-danger { --tone: var(--ts-danger); }
    .tone-off { --tone: var(--ts-ink2); }
    .status-text { color: var(--tone, var(--ts-ink)); }
    ha-icon { --mdc-icon-size: 20px; color: var(--tone, var(--ts-ink2)); }

    /* vista C: sola lettura */
    .view { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px 0 0; }
    .dial {
      position: relative;
      width: 200px;
      height: 200px;
      --p: 0;
      color: var(--ts-ink);
    }
    .dial::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(var(--tone, var(--ts-accent)) calc(var(--p) * 270deg), var(--ts-sep) 0);
      transform: rotate(135deg);
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px));
      transition: background 250ms ease;
    }
    .dial-value {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      font-weight: 300;
      line-height: 56px;
    }
    .dial-value small { font-size: 26px; vertical-align: top; margin-left: 2px; }
    .dial-mode { font-size: 15px; color: var(--ts-ink2); margin-top: 4px; }
    .blocks { list-style: none; margin: 0; padding: 0; width: 100%; }
    .blocks li { display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 8px 16px; font-size: 17px; }
    .blocks li + li { border-top: 0.5px solid var(--ts-sep); }
    .blocks .days { flex: 1; color: var(--ts-ink2); font-size: 15px; }
    .blocks time { font-weight: 600; }
    .blocks .temp { min-width: 56px; text-align: right; font-weight: 600; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); flex-shrink: 0; }
    .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; color: var(--ts-ink2); }
    .empty ha-icon { --mdc-icon-size: 36px; }
    .view-actions { width: 100%; padding: 8px 0 0; }

    /* editor A */
    .editor { display: flex; flex-direction: column; gap: 8px; }
    .editor input[type="text"], .editor input:not([type]) { flex: 1; width: 100%; }
    .seg {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      padding: 2px;
      margin: 12px 16px 4px;
      border-radius: 10px;
      background: light-dark(#e9e9eb, #1c1c1e);
    }
    .seg button {
      min-width: 0;
      min-height: 36px;
      padding: 0;
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      background: transparent;
      color: var(--ts-ink);
    }
    .seg button[aria-pressed="true"] {
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      color: var(--ts-accent);
      font-weight: 600;
    }
    .stepper { display: inline-flex; align-items: center; gap: 4px; }
    .stepper button { min-width: 44px; font-size: 22px; line-height: 1; }
    .stepper output { min-width: 64px; text-align: center; font-size: 17px; font-weight: 600; }
    .actions { display: flex; gap: 8px; }
    .actions button { flex: 1; }
    .sub-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

    /* condizioni */
    .cond-list .row > b { font-weight: 600; }
    .cond-list .meta { color: var(--ts-ink2); font-size: 15px; }
    .cond-editor { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    .cond-editor .row { padding: 0; min-height: 0; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
    @media (max-width: 360px) {
      .wrap { padding: 12px; }
      .dial { width: 176px; height: 176px; }
      .dial-value { font-size: 44px; }
    }
  `;

  hass: any;
  _data: Data | null = null;
  _profile: Profile | null = null;
  _condition: Condition | null = null;
  _selected = "";
  _configuring = false;
  _error = "";
  private _retry: (() => Promise<unknown>) | null = null;
  private _loaded = false;

  setConfig(_config: unknown) {}
  getCardSize() { return 6; }

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

  // stato di sola UI: apre e chiude l'editor della programmazione
  private _openEditor() {
    this._syncProfile();
    if (this._profile) this._configuring = true;
  }
  private _closeEditor() {
    this._profile = null;
    this._syncProfile();
    this._configuring = false;
  }
  private async _saveProfile() {
    const profile = this._profile!;
    await this._try(() => this._api.saveProfile(profile));
    if (!this._error) this._configuring = false;
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
  private _dayList(days: number[]) {
    const names = this._dayNames();
    return days.map((d) => names[d]).join(" ");
  }
  private _blockTone(b: Block) { return b.hvac_mode === "cool" ? "cool" : "heat"; }

  private _actionLabel(c: Condition) {
    return c.action.kind === "off" ? this._t("actionOff") : this._t("actionMin", { x: c.action.temperature ?? "" });
  }

  private _patchProfile(fn: (p: Profile) => void) {
    const copy = structuredClone(this._profile!);
    fn(copy);
    this._profile = copy;
  }

  private _stepTemp(i: number, delta: number) {
    this._patchProfile((p) => (p.blocks[i].temperature = clampTemp(p.blocks[i].temperature + delta)));
  }

  private _patchCondition(fn: (c: Condition) => void) {
    const copy = structuredClone(this._condition!);
    fn(copy);
    this._condition = copy;
  }

  render() {
    if (!this._data) return nothing;
    return html`<div class="wrap">
      ${this._error ? html`<div class="banner" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${this._error}</span>
        <button class="pill" @click=${() => this._retry && this._try(this._retry)}>${this._t("retry")}</button>
      </div>` : nothing}
      ${this._renderClimates()}
      ${this._renderConditions()}
    </div>`;
  }

  private _renderClimates() {
    const d = this._data!;
    const all = Object.keys(this.hass.states).filter((id) => id.startsWith("climate."));
    return html`<h3>${this._t("climates")}</h3>
      <div class="group">
        <div class="row">
          <select class="picker" aria-label=${this._t("climates")}
            @change=${(e: Event) => { this._configuring = false; this._select(val(e)); }}>
            ${all.map((id) => html`<option value=${id} ?selected=${id === this._selected}>${this._name(id)}${id in d.assignments ? " ✓" : ""}</option>`)}
          </select>
        </div>
      </div>
      ${this._selected ? this._renderThermostat(this._selected) : nothing}`;
  }

  private _renderThermostat(cid: string) {
    const d = this._data!;
    const a = d.assignments[cid];
    const others = a ? this._users(a.profile_id).filter((id) => id !== cid) : [];
    return html`<div data-climate=${cid}>
      ${this._renderStatus(cid)}
      ${this._configuring && this._profile ? this._renderEditor() : this._renderView(cid)}
      <div class="group">
        ${a ? html`<label class="row">
          <span>${this._t("active")}</span>
          <input type="checkbox" role="switch" .checked=${a.enabled}
            @change=${(e: Event) => this._try(() => this._api.assign(cid, a.profile_id, { enabled: checked(e) }))} />
        </label>` : nothing}
        <div class="row">
          <span>${this._t("schedule")}</span>
          <select data-action="link" @change=${(e: Event) => val(e) && this._try(() => this._api.assign(cid, val(e)))}>
            ${a ? nothing : html`<option value="">${this._t("useSchedule")}</option>`}
            ${Object.values(d.profiles).map((p) => html`<option value=${p.id} ?selected=${p.id === a?.profile_id}>${p.name} (${this._users(p.id).map((id) => this._name(id)).join(", ") || "-"})</option>`)}
          </select>
        </div>
        <div class="row">
          <button data-action="own" class="wide" @click=${() => this._try(() => this._makeOwn(cid))}>${this._t("ownSchedule")}</button>
        </div>
        ${others.length ? html`<p class="footnote">${this._t("sharedWith", { x: others.map((id) => this._name(id)).join(", ") })}</p>` : nothing}
        ${a ? Object.values(d.conditions).map((c) => html`<label class="row">
          <span>${c.name}</span>
          <input type="checkbox" role="switch" .checked=${a.condition_ids.includes(c.id)}
            @change=${(e: Event) => this._try(() => this._api.assign(cid, a.profile_id, {
              condition_ids: checked(e) ? [...a.condition_ids, c.id] : a.condition_ids.filter((x) => x !== c.id),
            }))} />
        </label>`) : nothing}
        ${a ? html`<div class="row">
          <button class="danger wide" @click=${() => this._try(() => this._api.unassign(cid))}>${this._t("unassign")}</button>
        </div>` : nothing}
      </div>
    </div>`;
  }

  private _renderStatus(cid: string) {
    const key = this._sensorState(cid);
    const tone = key === "blocked" ? "danger" : key === "override" ? "accent" : key === "disabled" ? "off" : this._hvac(cid) === "cool" ? "cool" : "heat";
    const icon: Record<string, string> = {
      override: "mdi:hand-back-left",
      blocked: "mdi:lock",
      disabled: "mdi:pause-circle-outline",
      scheduled: "mdi:calendar-clock",
    };
    const text = key === "override" ? `${this._t("override")} · ${this._status(cid)}` : this._status(cid);
    if (!text) return nothing;
    return html`<div class="status tone-${tone}">
      <span class="status-text" role="status">
        <ha-icon icon=${icon[key] ?? "mdi:thermostat"}></ha-icon>${text}
      </span>
      ${key === "override" ? html`<button class="pill" data-action="clear-override"
        @click=${() => this._try(() => this._api.clearOverride(cid))}>${this._t("clearOverride")}</button>` : nothing}
    </div>`;
  }

  // vista C, sola lettura: quadrante con la temperatura target e l'elenco delle fasce
  private _renderView(cid: string) {
    if (!this._profile) {
      return html`<div class="group"><div class="empty">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <p>${this._t("emptySchedule")}</p>
      </div></div>`;
    }
    const hvac = this._hvac(cid);
    const tone = hvac === "cool" ? "cool" : hvac === "heat" ? "heat" : "off";
    const modeLabel = hvac === "cool" ? this._t("cooling") : hvac === "heat" ? this._t("heating") : this._t("off");
    const temp = this._targetTemp(cid);
    const p = temp == null ? 0 : Math.min(1, Math.max(0, (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)));
    const blocks = this._profile.blocks;
    return html`<div class="view tone-${tone}">
      <div class="dial" style="--p: ${p}" role="img" aria-label=${`${this._t("target")} ${temp == null ? "–" : this._fmt(temp)} °`}>
        <span class="dial-value">${temp == null ? "–" : this._fmt(temp)}<small>°</small>
          <span class="dial-mode">${modeLabel}</span>
        </span>
      </div>
      <div class="group blocks-group" style="width:100%">
        ${blocks.length ? html`<ul class="blocks" aria-label=${this._profile.name}>
          ${blocks.map((b) => html`<li class="tone-${this._blockTone(b)}">
            <i class="dot"></i>
            <span class="days">${this._dayList(b.days)}</span>
            <time datetime=${b.start}>${b.start}</time>
            <span class="temp">${this._fmt(b.temperature)}°</span>
          </li>`)}
        </ul>` : html`<p class="footnote">${this._t("noBlocks")}</p>`}
      </div>
      <div class="view-actions">
        <button class="primary wide" data-action="configure" @click=${() => this._openEditor()}>${this._t("configure")}</button>
      </div>
    </div>`;
  }

  // editor A: giorni, ora, temperatura con stepper, modalità
  private _renderEditor() {
    const p = this._profile!;
    const names = this._dayNames();
    return html`<div class="editor">
      <div class="group">
        <label class="row">
          <span>${this._t("name")}</span>
          <input type="text" .value=${p.name} placeholder=${this._t("name")}
            @input=${(e: Event) => this._patchProfile((x) => (x.name = val(e)))} />
        </label>
      </div>
      ${p.blocks.map((b, i) => html`<div class="group">
        <div class="seg" role="group" aria-label=${this._t("days")}>
          ${DAYS.map((d) => html`<button type="button" aria-pressed=${b.days.includes(d)}
            @click=${() => this._patchProfile((x) => {
              const set = new Set(x.blocks[i].days);
              set.has(d) ? set.delete(d) : set.add(d);
              x.blocks[i].days = [...set].sort();
            })}>${names[d]}</button>`)}
        </div>
        <div class="row">
          <span>${this._t("start")}</span>
          <input type="time" aria-label=${this._t("start")} .value=${b.start}
            @input=${(e: Event) => this._patchProfile((x) => (x.blocks[i].start = val(e)))} />
        </div>
        <div class="row">
          <span>${this._t("temperature")}</span>
          <div class="stepper">
            <button type="button" aria-label=${this._t("lower")} @click=${() => this._stepTemp(i, -TEMP_STEP)}>−</button>
            <output aria-live="polite">${this._fmt(b.temperature)}°</output>
            <button type="button" aria-label=${this._t("raise")} @click=${() => this._stepTemp(i, TEMP_STEP)}>+</button>
          </div>
        </div>
        <div class="row">
          <input type="text" aria-label=${this._t("mode")} placeholder=${this._t("mode")} .value=${b.hvac_mode ?? ""}
            @input=${(e: Event) => this._patchProfile((x) => (x.blocks[i].hvac_mode = val(e) || null))} />
          <button type="button" class="danger" @click=${() => this._patchProfile((x) => x.blocks.splice(i, 1))}>${this._t("removeBlock")}</button>
        </div>
      </div>`)}
      <button type="button" class="wide" @click=${() => this._patchProfile((x) => x.blocks.push({ days: [0, 1, 2, 3, 4], start: "06:30", temperature: 20, hvac_mode: null }))}>${this._t("addBlock")}</button>
      <div class="actions">
        <button type="button" data-action="save-profile" class="primary" @click=${() => this._saveProfile()}>${this._t("save")}</button>
        <button type="button" @click=${() => this._closeEditor()}>${this._t("cancel")}</button>
      </div>
    </div>`;
  }

  private _renderConditions() {
    const d = this._data!;
    return html`<h3>${this._t("conditions")}</h3>
      <div class="group cond-list">
        ${Object.values(d.conditions).map((c) => html`<div class="row">
          <b>${c.name}</b>
          <span class="meta">${c.checks.map((k) => `${k.entity_id} ${k.op} ${k.value}`).join(c.match === "all" ? " & " : " | ")}</span>
          <span class="meta">${this._t("delaySec", { x: c.delay })}</span>
          <span class="meta">${this._actionLabel(c)}</span>
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
  description: "Programmazioni, override e condizioni per i climate",
});
