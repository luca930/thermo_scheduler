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
    copyDay: "Copy day…", copyDayTo: "Copy {x} to…", copyDayHint: "Slots already on the selected days are replaced.", apply: "Apply", weekdays: "Mon–Fri", weekend: "Weekend", allDays: "All",
    days: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
    configure: "Configure", active: "Active", schedule: "Schedule", noBlocks: "No schedule blocks",
    emptySchedule: "No schedule for this thermostat", heating: "Heating", cooling: "Cooling", off: "Off",
    target: "Target", lower: "Lower by 0.5 °", raise: "Raise by 0.5 °", actionFailed: "Action failed", retry: "Retry",
    next: "Next", tomorrow: "Tomorrow", timeSlots: "Time slots", back: "Back", noBlocksDay: "No slots this day",
    slot: "Slot", done: "Done", forThis: "For this thermostat",
    settings: "Settings", history: "History", refresh: "Refresh", logAll: "All", logManual: "Manual", logAuto: "Automatic", logService: "Service", noHistory: "No activity yet", log_save_profile: "Schedule saved", log_delete_profile: "Schedule deleted", log_save_condition: "Condition saved", log_delete_condition: "Condition deleted", log_assign: "Schedule assigned", log_unassign: "Thermostat unassigned", log_clear_override: "Override cleared", log_set_room: "Room saved", log_set_preheat: "Preheat changed", log_override: "Manual change", log_override_scaduto: "Override expired", log_ciclo_appreso: "Heating cycle learned", log_condizione_attiva: "Condition active", log_condizione_finita: "Condition ended", log_fascia: "Slot applied", log_preriscaldamento: "Preheat", house: "Home", houseHint: "Heating system, boiler and energy class are set in the integration settings.", preheat: "Preheat", preheatHint: "Starts heating before the next slot, based on the estimate.", preheating: "preheating", emitter: "Heating system", boiler: "Boiler", energyClass: "Energy class", area: "Area (m²)", height: "Height (m)", saveHouse: "Save home", emitterRadiators: "Radiators", emitterFloor: "Floor", boilerGas: "Gas", boilerHeatPump: "Heat pump", startAt: "Start", estMinutes: "~{x} min", noInside: "Indoor temperature unavailable", noOutdoor: "Set the outdoor sensor in the card", unreachable: "Target not reachable in time", calibrated: "calibrated on {x} cycles", genericEstimate: "generic estimate: set up the home", changeMode: "Change mode", auto: "Auto", dry: "Dry", fan: "Fan",
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
    copyDay: "Copia giornata…", copyDayTo: "Copia {x} su…", copyDayHint: "Le fasce già presenti nei giorni scelti vengono sostituite.", apply: "Applica", weekdays: "Lun–Ven", weekend: "Weekend", allDays: "Tutti",
    days: "Lun,Mar,Mer,Gio,Ven,Sab,Dom",
    configure: "Configura", active: "Attiva", schedule: "Programmazione", noBlocks: "Nessuna fascia",
    emptySchedule: "Nessuna programmazione per questo termostato", heating: "Riscaldamento", cooling: "Raffrescamento",
    off: "Spento", target: "Obiettivo", lower: "Abbassa di 0,5 °", raise: "Alza di 0,5 °",
    actionFailed: "Operazione non riuscita", retry: "Riprova",
    next: "Prossima", tomorrow: "Domani", timeSlots: "Fasce orarie", back: "Indietro", noBlocksDay: "Nessuna fascia in questo giorno",
    slot: "Fascia", done: "Fine", forThis: "Per questo termostato",
    settings: "Impostazioni", history: "Cronologia", refresh: "Aggiorna", logAll: "Tutte", logManual: "Manuali", logAuto: "Automatiche", logService: "Servizio", noHistory: "Nessuna attività ancora", log_save_profile: "Programmazione salvata", log_delete_profile: "Programmazione eliminata", log_save_condition: "Condizione salvata", log_delete_condition: "Condizione eliminata", log_assign: "Programmazione assegnata", log_unassign: "Termostato rimosso dalla programmazione", log_clear_override: "Override annullato", log_set_room: "Stanza salvata", log_set_preheat: "Preriscaldamento modificato", log_override: "Modifica manuale", log_override_scaduto: "Override scaduto", log_ciclo_appreso: "Ciclo di riscaldamento appreso", log_condizione_attiva: "Condizione attiva", log_condizione_finita: "Condizione finita", log_fascia: "Fascia applicata", log_preriscaldamento: "Preriscaldamento", house: "Casa", houseHint: "Impianto, caldaia e classe energetica si impostano nelle impostazioni dell'integrazione.", preheat: "Preriscaldamento", preheatHint: "Accende il riscaldamento prima della fascia successiva, in base alla stima.", preheating: "preriscaldamento", emitter: "Impianto", boiler: "Caldaia", energyClass: "Classe energetica", area: "Superficie (m²)", height: "Altezza (m)", saveHouse: "Salva casa", emitterRadiators: "Termosifoni", emitterFloor: "Pavimento", boilerGas: "Metano", boilerHeatPump: "Pompa di calore", startAt: "Avvio", estMinutes: "~{x} min", noInside: "Temperatura interna non disponibile", noOutdoor: "Imposta il sensore esterno nella card", unreachable: "Target non raggiungibile in tempo", calibrated: "calibrata su {x} cicli", genericEstimate: "stima generica: configura la casa", changeMode: "Cambia modalità", auto: "Automatico", dry: "Deumidifica", fan: "Ventilatore",
  },
};

export function t(lang: string | undefined, key: string, vars: Record<string, string | number> = {}): string {
  const table = STRINGS[lang?.startsWith("it") ? "it" : "en"];
  return (table[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
}
