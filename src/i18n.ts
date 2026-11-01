const STRINGS: Record<string, Record<string, string>> = {
  en: {
    climates: "Thermostats", profiles: "Schedules", conditions: "Conditions",
    until: "Until {t}", scheduled: "Scheduled", override: "Manual", blocked: "Blocked", disabled: "Disabled",
    clearOverride: "Back to schedule", enable: "Enable", disable: "Disable", unassign: "Remove",
    assign: "Assign", addClimate: "Add thermostat", save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete",
    newProfile: "New schedule", newCondition: "New condition", name: "Name", start: "Start",
    temperature: "Temperature", mode: "Mode", addBlock: "Add block", removeBlock: "Remove block",
    entity: "Entity", value: "Value", match: "Match", all: "All", any: "Any", addCheck: "Add check",
    delay: "Delay (s)", action: "Action", actionOff: "Turn off", actionMin: "Minimum setpoint {x}",
    delaySec: "delay {x}s",
    days: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
  },
  it: {
    climates: "Termostati", profiles: "Programmazioni", conditions: "Condizioni",
    until: "Fino alle {t}", scheduled: "Programmato", override: "Manuale", blocked: "Bloccato", disabled: "Disattivato",
    clearOverride: "Torna alla programmazione", enable: "Attiva", disable: "Disattiva", unassign: "Rimuovi",
    assign: "Assegna", addClimate: "Aggiungi termostato", save: "Salva", cancel: "Annulla", edit: "Modifica", delete: "Elimina",
    newProfile: "Nuova programmazione", newCondition: "Nuova condizione", name: "Nome", start: "Inizio",
    temperature: "Temperatura", mode: "Modalità", addBlock: "Aggiungi fascia", removeBlock: "Rimuovi fascia",
    entity: "Entità", value: "Valore", match: "Combinazione", all: "Tutte", any: "Almeno una", addCheck: "Aggiungi test",
    delay: "Ritardo (s)", action: "Azione", actionOff: "Spegni", actionMin: "Setpoint minimo {x}",
    delaySec: "ritardo {x}s",
    days: "Lun,Mar,Mer,Gio,Ven,Sab,Dom",
  },
};

export function t(lang: string | undefined, key: string, vars: Record<string, string | number> = {}): string {
  const table = STRINGS[lang?.startsWith("it") ? "it" : "en"];
  return (table[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
}
