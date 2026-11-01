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
    useSchedule: "Use schedule of…", ownSchedule: "Own schedule", sharedWith: "Shared with: {x}",
    days: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
    configure: "Configure", active: "Active", schedule: "Schedule", noBlocks: "No schedule blocks",
    emptySchedule: "No schedule for this thermostat", heating: "Heating", cooling: "Cooling", off: "Off",
    target: "Target", lower: "Lower by 0.5 °", raise: "Raise by 0.5 °", actionFailed: "Action failed", retry: "Retry",
    next: "Next", tomorrow: "Tomorrow", timeSlots: "Time slots", back: "Back", noBlocksDay: "No slots this day",
    slot: "Slot", done: "Done", forThis: "For this thermostat",
    settings: "Settings", changeMode: "Change mode", auto: "Auto", dry: "Dry", fan: "Fan",
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
    useSchedule: "Usa la programmazione di…", ownSchedule: "Programmazione propria", sharedWith: "Condivisa con: {x}",
    days: "Lun,Mar,Mer,Gio,Ven,Sab,Dom",
    configure: "Configura", active: "Attiva", schedule: "Programmazione", noBlocks: "Nessuna fascia",
    emptySchedule: "Nessuna programmazione per questo termostato", heating: "Riscaldamento", cooling: "Raffrescamento",
    off: "Spento", target: "Obiettivo", lower: "Abbassa di 0,5 °", raise: "Alza di 0,5 °",
    actionFailed: "Operazione non riuscita", retry: "Riprova",
    next: "Prossima", tomorrow: "Domani", timeSlots: "Fasce orarie", back: "Indietro", noBlocksDay: "Nessuna fascia in questo giorno",
    slot: "Fascia", done: "Fine", forThis: "Per questo termostato",
    settings: "Impostazioni", changeMode: "Cambia modalità", auto: "Automatico", dry: "Deumidifica", fan: "Ventilatore",
  },
};

export function t(lang: string | undefined, key: string, vars: Record<string, string | number> = {}): string {
  const table = STRINGS[lang?.startsWith("it") ? "it" : "en"];
  return (table[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
}
