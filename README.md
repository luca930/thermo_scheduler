# Thermo Scheduler

Nest-style scheduling for one or more Home Assistant `climate` entities. Local only, no cloud.

- **Schedules**: weekly blocks (days, start time, temperature, optional HVAC mode). A block lasts until the next one starts. One schedule can drive many thermostats; different thermostats can use different schedules.
- **Manual override**: change a thermostat by hand and the change holds until the next block starts ("Until 22:00"), then the schedule resumes.
- **Blocking conditions** (set from the UI): entity checks (`=`, `!=`, `>`, `<`), combined with *all* or *any*, an optional delay, and an action: turn off or drop to a minimum setpoint. When the condition ends, the thermostat returns to its schedule. A manual change made during a block wins.
- **Event driven**: one timer on the next block change, no polling.
- UI in English and Italian.

## Install

1. HACS → Integrations → ⋮ → Custom repositories → add this repository as *Integration*.
2. Install **Thermo Scheduler**, restart Home Assistant.
3. Settings → Devices & services → Add integration → **Thermo Scheduler**.
4. Add the card to a dashboard:

```yaml
type: custom:thermo-scheduler-card
```

The card script is served by the integration and loaded automatically.

## Entities and services

Each assigned thermostat gets a `sensor.<climate>_scheduler` with state `scheduled`, `override`, `blocked` or `disabled`, and attributes `profile`, `setpoint`, `next_change`, `override_until`, `condition`.

Services (`thermo_scheduler.*`): `set_profile`, `clear_override`, `enable`, `disable`.

## Development

```bash
python3.13 -m venv .venv && .venv/bin/pip install pytest pytest-homeassistant-custom-component
.venv/bin/python -m pytest tests -q
pnpm install && pnpm test && pnpm build
```

`pnpm build` writes `custom_components/thermo_scheduler/www/thermo-scheduler-card.js`, which is committed so HACS can install it as is.
