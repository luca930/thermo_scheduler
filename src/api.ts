export interface Block {
  days: number[];
  start: string;
  temperature: number;
  hvac_mode: string | null;
}
export interface Profile {
  id: string;
  name: string;
  blocks: Block[];
}
export interface Check {
  entity_id: string;
  op: "=" | "!=" | ">" | "<";
  value: string;
}
export interface Condition {
  id: string;
  name: string;
  checks: Check[];
  match: "all" | "any";
  delay: number;
  action: { kind: "off" | "min_setpoint"; temperature: number | null };
}
export interface Assignment {
  profile_id: string;
  condition_ids: string[];
  enabled: boolean;
}
export interface Data {
  profiles: Record<string, Profile>;
  conditions: Record<string, Condition>;
  assignments: Record<string, Assignment>;
}

type Call = (msg: { type: string; [key: string]: unknown }) => Promise<unknown>;

export const api = (call: Call) => ({
  list: () => call({ type: "thermo_scheduler/list" }) as Promise<Data>,
  saveProfile: (profile: Profile) => call({ type: "thermo_scheduler/save_profile", profile }),
  deleteProfile: (profile_id: string) => call({ type: "thermo_scheduler/delete_profile", profile_id }),
  saveCondition: (condition: Condition) => call({ type: "thermo_scheduler/save_condition", condition }),
  deleteCondition: (condition_id: string) =>
    call({ type: "thermo_scheduler/delete_condition", condition_id }),
  assign: (climate_id: string, profile_id: string, extra: { condition_ids?: string[]; enabled?: boolean } = {}) =>
    call({ type: "thermo_scheduler/assign", climate_id, profile_id, ...extra }),
  unassign: (climate_id: string) => call({ type: "thermo_scheduler/unassign", climate_id }),
  clearOverride: (climate_id: string) => call({ type: "thermo_scheduler/clear_override", climate_id }),
});
