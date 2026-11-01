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

async function mount(language = "it") {
  const callWS = vi.fn(async (msg: { type: string }) =>
    msg.type === "thermo_scheduler/list" ? DATA : undefined,
  );
  const el = document.createElement("thermo-scheduler-card") as any;
  el.setConfig({});
  el.hass = {
    language,
    callWS,
    states: {
      "climate.salotto": { state: "heat", attributes: { friendly_name: "Salotto" } },
      "climate.camera": { state: "heat", attributes: { friendly_name: "Camera" } },
      "climate.bagno": { state: "heat", attributes: { friendly_name: "Bagno" } },
      "sensor.salotto_scheduler": {
        state: "override",
        attributes: { override_until: "2026-11-04T22:00:00+01:00" },
      },
    },
  };
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return { el, callWS };
}

describe("thermo-scheduler-card", () => {
  it("renders override_until label", async () => {
    const { el } = await mount("it");
    expect(el.shadowRoot.textContent).toContain("Fino alle 22:00");
  });

  it("saves profile via ws", async () => {
    const { el, callWS } = await mount("en");
    el.shadowRoot.querySelector('[data-action="configure"]').click();
    await el.updateComplete;
    el._profile = { id: "p9", name: "Test", blocks: [] };
    await el.updateComplete;
    el.shadowRoot.querySelector('[data-action="save-profile"]').click();
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledWith({
      type: "thermo_scheduler/save_profile",
      profile: { id: "p9", name: "Test", blocks: [] },
    });
  });

  it("lists conditions with delay and action", async () => {
    const { el } = await mount("it");
    const text = el.shadowRoot.textContent;
    expect(text).toContain("Finestra");
    expect(text).toContain("120");
    expect(text).toContain("Spegni");
  });

  it("shows the selected thermostat's schedule and who shares it", async () => {
    const { el } = await mount("it");
    el._select("climate.camera");
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(root.querySelector('input[type="time"]')).toBeNull();
    root.querySelector('[data-action="configure"]').click();
    await el.updateComplete;
    expect(root.querySelector('input[type="time"]').value).toBe("06:30");
    expect(root.textContent).toContain("Condivisa con: Salotto");
  });

  it("shows the schedule read-only until configure is pressed", async () => {
    const { el } = await mount("it");
    el._select("climate.camera");
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(root.querySelector('[data-action="save-profile"]')).toBeNull();
    expect(root.querySelector(".blocks").textContent).toContain("06:30");
    expect(root.querySelector('[data-action="configure"]')).not.toBeNull();
  });

  it("shows an error banner with retry when an action fails", async () => {
    const { el, callWS } = await mount("it");
    callWS.mockRejectedValueOnce(new Error("boom"));
    el._select("climate.camera");
    await el.updateComplete;
    el.shadowRoot.querySelector('[data-action="clear-override"]')?.click();
    el.shadowRoot.querySelector('select[data-action="link"]').dispatchEvent(new Event("change"));
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).not.toBeNull();
  });

  it("links an unassigned thermostat to another thermostat's schedule", async () => {
    const { el, callWS } = await mount("it");
    el._select("climate.bagno");
    await el.updateComplete;
    const sel = el.shadowRoot.querySelector('[data-action="link"]');
    sel.value = "p1";
    sel.dispatchEvent(new Event("change"));
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledWith({
      type: "thermo_scheduler/assign",
      climate_id: "climate.bagno",
      profile_id: "p1",
    });
  });

  it("makes a shared schedule independent by copying it", async () => {
    const { el, callWS } = await mount("it");
    el._select("climate.camera");
    await el.updateComplete;
    el.shadowRoot.querySelector('[data-action="own"]').click();
    await new Promise((r) => setTimeout(r, 0));
    const save = callWS.mock.calls.map((c: any[]) => c[0]).find((m: any) => m.type === "thermo_scheduler/save_profile");
    expect(save.profile.name).toBe("Camera");
    expect(save.profile.id).not.toBe("p1");
    expect(save.profile.blocks).toEqual(DATA.profiles.p1.blocks);
    expect(callWS).toHaveBeenCalledWith(
      expect.objectContaining({ type: "thermo_scheduler/assign", climate_id: "climate.camera", profile_id: save.profile.id }),
    );
  });
});
