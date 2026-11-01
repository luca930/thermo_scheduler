import { describe, expect, it, vi } from "vitest";
import "../src/thermo-scheduler-card";

const DATA = {
  profiles: {
    p1: {
      id: "p1",
      name: "Casa",
      blocks: [{ days: [0, 1, 2, 3, 4], start: "06:30", temperature: 21, hvac_mode: null }],
    },
  },
  conditions: {
    c1: {
      id: "c1",
      name: "Finestra",
      checks: [{ entity_id: "binary_sensor.finestra", op: "=", value: "on" }],
      match: "all",
      delay: 120,
      action: { kind: "off", temperature: null },
    },
  },
  assignments: {
    "climate.salotto": { profile_id: "p1", condition_ids: ["c1"], enabled: true },
    "climate.camera": { profile_id: "p1", condition_ids: [], enabled: true },
  },
  overrides: {},
};

const tick = () => new Promise((r) => setTimeout(r, 0));

async function mount(language = "it", entity = "climate.salotto") {
  const callWS = vi.fn(async (msg: { type: string }) =>
    msg.type === "thermo_scheduler/list" ? DATA : undefined,
  );
  const el = document.createElement("thermo-scheduler-card") as any;
  el.setConfig({ entity });
  el.hass = {
    language,
    callWS,
    states: {
      "climate.salotto": { state: "heat", attributes: { friendly_name: "Salotto", temperature: 21 } },
      "climate.camera": { state: "heat", attributes: { friendly_name: "Camera", temperature: 20 } },
      "climate.bagno": { state: "heat", attributes: { friendly_name: "Bagno", temperature: 19 } },
      "sensor.salotto_scheduler": {
        state: "override",
        attributes: { override_until: "2026-11-04T22:00:00+01:00" },
      },
    },
  };
  document.body.appendChild(el);
  await el.updateComplete;
  await tick();
  await el.updateComplete;
  return { el, callWS };
}

const click = async (el: any, selector: string) => {
  el.shadowRoot.querySelector(selector).click();
  await el.updateComplete;
};

describe("thermo-scheduler-card", () => {
  it("requires an entity in the configuration", () => {
    const el = document.createElement("thermo-scheduler-card") as any;
    expect(() => el.setConfig({})).toThrow(/entity/);
  });

  it("shows the override in the summary", async () => {
    const { el } = await mount("it");
    expect(el.shadowRoot.textContent).toContain("Fino alle 22:00");
  });

  it("summary is read-only and opens the settings on tap", async () => {
    const { el } = await mount("it");
    expect(el.shadowRoot.querySelector('input[type="time"]')).toBeNull();
    await click(el, ".hero-top");
    expect(el.shadowRoot.querySelector('[data-action="open-schedule"]')).not.toBeNull();
  });

  it("opens the schedule and edits a slot", async () => {
    const { el } = await mount("it");
    await click(el, ".hero-top");
    await click(el, '[data-action="open-schedule"]');
    expect(el.shadowRoot.querySelector('input[type="time"]')).toBeNull();
    await click(el, ".tabs button:nth-child(1)"); // lunedì
    await click(el, ".slot");
    expect(el.shadowRoot.querySelector('input[type="time"]').value).toBe("06:30");
  });

  it("saves profile via ws", async () => {
    const { el, callWS } = await mount("en");
    await click(el, ".hero-top");
    await click(el, '[data-action="open-schedule"]');
    el._profile = { id: "p9", name: "Test", blocks: [] };
    await el.updateComplete;
    await click(el, '[data-action="save-profile"]');
    await tick();
    expect(callWS).toHaveBeenCalledWith({
      type: "thermo_scheduler/save_profile",
      profile: { id: "p9", name: "Test", blocks: [] },
    });
  });

  it("lists conditions with delay and action", async () => {
    const { el } = await mount("it");
    await click(el, ".hero-top");
    await click(el, '[data-action="conditions"]');
    const text = el.shadowRoot.textContent;
    expect(text).toContain("Finestra");
    expect(text).toContain("120");
    expect(text).toContain("Spegni");
  });

  it("shows who shares the selected thermostat's schedule", async () => {
    const { el } = await mount("it", "climate.camera");
    await click(el, ".hero-top");
    expect(el.shadowRoot.textContent).toContain("Condivisa con: Salotto");
  });

  it("links an unassigned thermostat to another thermostat's schedule", async () => {
    const { el, callWS } = await mount("it", "climate.bagno");
    await click(el, ".hero-top");
    const sel = el.shadowRoot.querySelector('[data-action="link"]');
    sel.value = "p1";
    sel.dispatchEvent(new Event("change"));
    await tick();
    expect(callWS).toHaveBeenCalledWith({
      type: "thermo_scheduler/assign",
      climate_id: "climate.bagno",
      profile_id: "p1",
    });
  });

  it("makes a shared schedule independent by copying it", async () => {
    const { el, callWS } = await mount("it", "climate.camera");
    await click(el, ".hero-top");
    await click(el, '[data-action="own"]');
    await tick();
    const save = callWS.mock.calls.map((c: any[]) => c[0]).find((m: any) => m.type === "thermo_scheduler/save_profile");
    expect(save.profile.name).toBe("Camera");
    expect(save.profile.id).not.toBe("p1");
    expect(save.profile.blocks).toEqual(DATA.profiles.p1.blocks);
    expect(callWS).toHaveBeenCalledWith(
      expect.objectContaining({ type: "thermo_scheduler/assign", climate_id: "climate.camera", profile_id: save.profile.id }),
    );
  });

  it("shows an error banner with retry when an action fails", async () => {
    const { el, callWS } = await mount("it", "climate.camera");
    callWS.mockRejectedValueOnce(new Error("boom"));
    await click(el, ".hero-top");
    const sel = el.shadowRoot.querySelector('select[data-action="link"]');
    sel.dispatchEvent(new Event("change"));
    await tick();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).not.toBeNull();
  });

  it("shows the activity history and filters it by origin", async () => {
    const LOG = [
      { ts: "2026-11-01T06:30:00+01:00", source: "auto", climate: "climate.salotto", action: "fascia", detail: "21 °C" },
      { ts: "2026-11-01T07:00:00+01:00", source: "manual", climate: "climate.salotto", action: "save_profile", detail: "{}" },
    ];
    const { el } = await mount("it");
    el.hass = { ...el.hass, callWS: async (m: { type: string }) => (m.type === "thermo_scheduler/log" ? LOG : DATA) };
    await click(el, ".hero-top");
    await click(el, '[data-action="history"]');
    await tick();
    await el.updateComplete;
    expect(el.shadowRoot.textContent).toContain("Programmazione salvata");
    expect(el.shadowRoot.textContent).toContain("Fascia applicata");
    el.shadowRoot.querySelectorAll(".seg button")[2].click();
    await el.updateComplete;
    expect(el.shadowRoot.textContent).not.toContain("Programmazione salvata");
    expect(el.shadowRoot.textContent).toContain("Fascia applicata");
  });
});
