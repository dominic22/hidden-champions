# Home Assistant – WRC6 automation creation

Scripts to create Home Assistant automations that map the six buttons of an
**HmIP-WRC6** wall remote to existing automations, via the HA REST API.

A **short press** (`short_release`) of button _N_ triggers the mapped
automation(s).

## Button mapping

| Button | Automation(s) triggered |
|--------|-------------------------|
| Taste 1 | `automation.bed_time_turn_off` |
| Taste 2 | `automation.obergeschoss_luften` |
| Taste 3 | `automation.erdgeschoss_turn_off` |
| Taste 4 | `automation.erdgeschoss_luften` |
| Taste 5 | `automation.bed_time_turn_off` + `automation.erdgeschoss_turn_off` |
| Taste 6 | `automation.obergeschoss_luften` + `automation.erdgeschoss_luften` |

The WRC6 buttons are the entities
`event.flur_eg_homematic_hcu_wandtaster_6_fach_neu_taste_1` … `_taste_6`.

## Prerequisites

- A machine on the same LAN as Home Assistant (`http://192.168.178.109:8123`).
- A HA **Long-Lived Access Token** (profile → Security → Long-Lived Access Tokens).
- `bash`, `curl`, and `python3` (only for the verify script).
- HA Core ≥ 2026.6 so the WRC6 exposes per-button `event` entities.

## Usage

```bash
# Provide the token via an env var (recommended: keep it in a git-ignored file)
echo 'eyJ...your-token...' > token.txt        # token.txt is git-ignored
export HA_TOKEN="$(cat token.txt)"
export HA_URL='http://192.168.178.109:8123'    # optional; this is the default

./create-wrc6-automations.sh                   # creates + reloads the 6 automations
./verify-wrc6-automations.sh                   # prints their stored config
```

Each successful create prints `{"result":"ok"}`. The automations are UI-managed
(stored in `.storage`) and appear in **Settings → Automations**, editable there.

Override the button base entity id if yours differs:

```bash
export WRC6_BASE='event.your_wrc6_base_taste'
```

## How the trigger works

Each automation:

1. **Triggers** on any state change of the button entity — every press writes a
   fresh timestamp, so this fires reliably even on repeated identical presses.
   `not_from: [unavailable, unknown]` prevents firing on HA restart.
2. **Conditions** on `event_type == short_release` so only short presses count.
3. **Actions** call `automation.trigger` with `skip_condition: true`, i.e. the
   target automation's *actions* run directly, ignoring that automation's own
   conditions. Set it to `false` if you want each target to respect its own
   conditions.

To also wire long presses, add automations triggering on `event_type` values
`long_press` / `long_release`.

## Security

A Long-Lived Access Token grants **full control** of Home Assistant.

- Never commit the token. Keep it in `token.txt` (git-ignored) or an env var.
- Revoke tokens you no longer need in HA (profile → Security).
