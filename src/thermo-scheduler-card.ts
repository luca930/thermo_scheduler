import { LitElement, css, html, nothing } from "lit";
import { api, type Condition, type Data, type Profile } from "./api";
import { t } from "./i18n";

const val = (e: Event) => (e.target as HTMLInputElement).value;
const checked = (e: Event) => (e.target as HTMLInputElement).checked;
const newId = (prefix: string) => `${prefix}_${Date.now().toString(36)}`;

class ThermoSchedulerCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _data: { state: true },
    _profile: { state: true },
    _condition: { state: true },
    _newClimate: { state: true },
    _newProfile: { state: true },
  };
  static styles = css`
    :host { display: block; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: 4px 0; }
  `;

  hass: any;
  _data: Data | null = null;
  _profile: Profile | null = null;
  _condition: Condition | null = null;
  _newClimate = "";
  _newProfile = "";
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
  private async _reload() { this._data = await this._api.list(); }
  private async _do(fn: () => Promise<unknown>) { await fn(); await this._reload(); }

  private _status(climateId: string): string {
    const sensor = this.hass.states[`sensor.${climateId.split(".")[1]}_scheduler`];
    if (!sensor) return "";
    if (sensor.state === "override") {
      return this._t("until", { t: String(sensor.attributes.override_until ?? "").slice(11, 16) });
    }
    return this._t(sensor.state);
  }

  private _actionLabel(c: Condition) {
    return c.action.kind === "off" ? this._t("actionOff") : this._t("actionMin", { x: c.action.temperature ?? "" });
  }

  private _patchProfile(fn: (p: Profile) => void) {
    const copy = structuredClone(this._profile!);
    fn(copy);
    this._profile = copy;
  }

  private _patchCondition(fn: (c: Condition) => void) {
    const copy = structuredClone(this._condition!);
    fn(copy);
    this._condition = copy;
  }

  render() {
    if (!this._data) return nothing;
    return html`<ha-card>${this._renderClimates()}${this._renderProfiles()}${this._renderConditions()}</ha-card>`;
  }

  private _renderClimates() {
    const d = this._data!;
    const free = Object.keys(this.hass.states).filter((id) => id.startsWith("climate.") && !(id in d.assignments));
    return html`<section>
      <h3>${this._t("climates")}</h3>
      ${Object.entries(d.assignments).map(([cid, a]) => html`<div class="row" data-climate=${cid}>
        <b>${this.hass.states[cid]?.attributes?.friendly_name ?? cid}</b>
        <span>${this._status(cid)}</span>
        <select @change=${(e: Event) => this._do(() => this._api.assign(cid, val(e)))}>
          ${Object.values(d.profiles).map((p) => html`<option value=${p.id} ?selected=${p.id === a.profile_id}>${p.name}</option>`)}
        </select>
        ${Object.values(d.conditions).map((c) => html`<label><input type="checkbox" .checked=${a.condition_ids.includes(c.id)}
          @change=${(e: Event) => this._do(() => this._api.assign(cid, a.profile_id, {
            condition_ids: checked(e) ? [...a.condition_ids, c.id] : a.condition_ids.filter((x) => x !== c.id),
          }))} />${c.name}</label>`)}
        <button data-action="clear-override" @click=${() => this._do(() => this._api.clearOverride(cid))}>${this._t("clearOverride")}</button>
        <button @click=${() => this._do(() => this._api.assign(cid, a.profile_id, { enabled: !a.enabled }))}>${this._t(a.enabled ? "disable" : "enable")}</button>
        <button @click=${() => this._do(() => this._api.unassign(cid))}>${this._t("unassign")}</button>
      </div>`)}
      <div class="row">
        <select @change=${(e: Event) => (this._newClimate = val(e))}>
          <option value="">${this._t("addClimate")}</option>
          ${free.map((id) => html`<option value=${id}>${this.hass.states[id].attributes?.friendly_name ?? id}</option>`)}
        </select>
        <select @change=${(e: Event) => (this._newProfile = val(e))}>
          <option value="">${this._t("profiles")}</option>
          ${Object.values(d.profiles).map((p) => html`<option value=${p.id}>${p.name}</option>`)}
        </select>
        <button data-action="assign" ?disabled=${!this._newClimate || !this._newProfile}
          @click=${() => this._do(() => this._api.assign(this._newClimate, this._newProfile))}>${this._t("assign")}</button>
      </div>
    </section>`;
  }

  private _renderProfiles() {
    const d = this._data!;
    const days = this._t("days").split(",");
    return html`<section>
      <h3>${this._t("profiles")}</h3>
      ${Object.values(d.profiles).map((p) => html`<div class="row">
        <b>${p.name}</b><span>${p.blocks.length}</span>
        <button @click=${() => (this._profile = structuredClone(p))}>${this._t("edit")}</button>
        <button @click=${() => this._do(() => this._api.deleteProfile(p.id))}>${this._t("delete")}</button>
      </div>`)}
      <button @click=${() => (this._profile = { id: newId("p"), name: "", blocks: [] })}>${this._t("newProfile")}</button>
      ${this._profile ? html`<div class="editor">
        <input .value=${this._profile.name} placeholder=${this._t("name")}
          @input=${(e: Event) => this._patchProfile((p) => (p.name = val(e)))} />
        ${this._profile.blocks.map((b, i) => html`<div class="row">
          ${days.map((label, day) => html`<label><input type="checkbox" .checked=${b.days.includes(day)}
            @change=${(e: Event) => this._patchProfile((p) => {
              const set = new Set(p.blocks[i].days);
              checked(e) ? set.add(day) : set.delete(day);
              p.blocks[i].days = [...set].sort();
            })} />${label}</label>`)}
          <input type="time" .value=${b.start} @input=${(e: Event) => this._patchProfile((p) => (p.blocks[i].start = val(e)))} />
          <input type="number" step="0.5" .value=${String(b.temperature)}
            @input=${(e: Event) => this._patchProfile((p) => (p.blocks[i].temperature = Number(val(e))))} />
          <input placeholder=${this._t("mode")} .value=${b.hvac_mode ?? ""}
            @input=${(e: Event) => this._patchProfile((p) => (p.blocks[i].hvac_mode = val(e) || null))} />
          <button @click=${() => this._patchProfile((p) => p.blocks.splice(i, 1))}>${this._t("removeBlock")}</button>
        </div>`)}
        <button @click=${() => this._patchProfile((p) => p.blocks.push({ days: [0, 1, 2, 3, 4], start: "06:30", temperature: 20, hvac_mode: null }))}>${this._t("addBlock")}</button>
        <button data-action="save-profile" @click=${() => this._do(async () => { await this._api.saveProfile(this._profile!); this._profile = null; })}>${this._t("save")}</button>
        <button @click=${() => (this._profile = null)}>${this._t("cancel")}</button>
      </div>` : nothing}
    </section>`;
  }

  private _renderConditions() {
    const d = this._data!;
    return html`<section>
      <h3>${this._t("conditions")}</h3>
      ${Object.values(d.conditions).map((c) => html`<div class="row">
        <b>${c.name}</b>
        <span>${c.checks.map((k) => `${k.entity_id} ${k.op} ${k.value}`).join(c.match === "all" ? " & " : " | ")}</span>
        <span>${this._t("delaySec", { x: c.delay })}</span><span>${this._actionLabel(c)}</span>
        <button @click=${() => (this._condition = structuredClone(c))}>${this._t("edit")}</button>
        <button @click=${() => this._do(() => this._api.deleteCondition(c.id))}>${this._t("delete")}</button>
      </div>`)}
      <button @click=${() => (this._condition = { id: newId("c"), name: "", checks: [], match: "all", delay: 120, action: { kind: "off", temperature: null } })}>${this._t("newCondition")}</button>
      ${this._condition ? html`<div class="editor">
        <input .value=${this._condition.name} placeholder=${this._t("name")}
          @input=${(e: Event) => this._patchCondition((c) => (c.name = val(e)))} />
        <select @change=${(e: Event) => this._patchCondition((c) => (c.match = val(e) as "all" | "any"))}>
          <option value="all" ?selected=${this._condition.match === "all"}>${this._t("all")}</option>
          <option value="any" ?selected=${this._condition.match === "any"}>${this._t("any")}</option>
        </select>
        ${this._condition.checks.map((k, i) => html`<div class="row">
          <input placeholder=${this._t("entity")} .value=${k.entity_id} @input=${(e: Event) => this._patchCondition((c) => (c.checks[i].entity_id = val(e)))} />
          <select @change=${(e: Event) => this._patchCondition((c) => (c.checks[i].op = val(e) as "=" | "!=" | ">" | "<"))}>
            ${["=", "!=", ">", "<"].map((op) => html`<option ?selected=${k.op === op}>${op}</option>`)}
          </select>
          <input placeholder=${this._t("value")} .value=${k.value} @input=${(e: Event) => this._patchCondition((c) => (c.checks[i].value = val(e)))} />
          <button @click=${() => this._patchCondition((c) => c.checks.splice(i, 1))}>${this._t("delete")}</button>
        </div>`)}
        <button @click=${() => this._patchCondition((c) => c.checks.push({ entity_id: "", op: "=", value: "on" }))}>${this._t("addCheck")}</button>
        <input type="number" min="0" .value=${String(this._condition.delay)} title=${this._t("delay")}
          @input=${(e: Event) => this._patchCondition((c) => (c.delay = Number(val(e))))} />
        <select @change=${(e: Event) => this._patchCondition((c) => (c.action.kind = val(e) as "off" | "min_setpoint"))}>
          <option value="off" ?selected=${this._condition.action.kind === "off"}>${this._t("actionOff")}</option>
          <option value="min_setpoint" ?selected=${this._condition.action.kind === "min_setpoint"}>${this._t("actionMin", { x: "" })}</option>
        </select>
        ${this._condition.action.kind === "min_setpoint" ? html`<input type="number" step="0.5" .value=${String(this._condition.action.temperature ?? 12)}
          @input=${(e: Event) => this._patchCondition((c) => (c.action.temperature = Number(val(e))))} />` : nothing}
        <button data-action="save-condition" @click=${() => this._do(async () => { await this._api.saveCondition(this._condition!); this._condition = null; })}>${this._t("save")}</button>
        <button @click=${() => (this._condition = null)}>${this._t("cancel")}</button>
      </div>` : nothing}
    </section>`;
  }
}

customElements.define("thermo-scheduler-card", ThermoSchedulerCard);
(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push({
  type: "thermo-scheduler-card",
  name: "Thermo Scheduler",
  description: "Programmazioni, override e condizioni per i climate",
});
