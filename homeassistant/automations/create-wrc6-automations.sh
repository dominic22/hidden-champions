#!/usr/bin/env bash
#
# Create Home Assistant automations that map the 6 buttons of an HmIP-WRC6
# wall remote to existing automations. A short press (short_release) of button N
# triggers the mapped automation(s).
#
# Usage:
#   export HA_TOKEN='eyJ...'                     # HA long-lived access token
#   export HA_URL='http://192.168.178.109:8123'  # optional, this is the default
#   ./create-wrc6-automations.sh
#
# The token grants full control of Home Assistant. Do NOT commit it. Prefer
# putting it in a git-ignored token.txt (see README) and:  export HA_TOKEN="$(cat token.txt)"

set -euo pipefail

TOKEN="${HA_TOKEN:?Set HA_TOKEN to your Home Assistant long-lived access token}"
HA="${HA_URL:-http://192.168.178.109:8123}"

# Base entity id of the WRC6 buttons; button number is appended as _1 .. _6.
BTN="${WRC6_BASE:-event.flur_eg_homematic_hcu_wandtaster_6_fach_neu_taste}"

# create <config_id> <alias> <button_number> <target_automation> [more_targets...]
create() {
  local id="$1" alias="$2" btn="$3"; shift 3
  local actions=""
  for a in "$@"; do
    actions="$actions{\"service\":\"automation.trigger\",\"target\":{\"entity_id\":\"$a\"},\"data\":{\"skip_condition\":true}},"
  done
  actions="[${actions%,}]"
  echo -n "creating $id ($alias) ... "
  curl -s -X POST "$HA/api/config/automation/config/$id" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d "{\"alias\":\"$alias\",\"mode\":\"single\",\"trigger\":[{\"platform\":\"state\",\"entity_id\":\"${BTN}_${btn}\",\"not_from\":[\"unavailable\",\"unknown\"]}],\"condition\":[{\"condition\":\"state\",\"entity_id\":\"${BTN}_${btn}\",\"attribute\":\"event_type\",\"state\":\"short_release\"}],\"action\":$actions}"
  echo ""
}

create wrc6_taste_1 "WRC6 Taste 1 – Bed Time Turn Off"   1 automation.bed_time_turn_off
create wrc6_taste_2 "WRC6 Taste 2 – Obergeschoss Lüften"  2 automation.obergeschoss_luften
create wrc6_taste_3 "WRC6 Taste 3 – Erdgeschoss Turn Off" 3 automation.erdgeschoss_turn_off
create wrc6_taste_4 "WRC6 Taste 4 – Erdgeschoss Lüften"   4 automation.erdgeschoss_luften
create wrc6_taste_5 "WRC6 Taste 5 – Bed Time + EG Off"    5 automation.bed_time_turn_off automation.erdgeschoss_turn_off
create wrc6_taste_6 "WRC6 Taste 6 – OG + EG Lüften"       6 automation.obergeschoss_luften automation.erdgeschoss_luften

echo "reloading automations ..."
curl -s -X POST "$HA/api/services/automation/reload" -H "Authorization: Bearer $TOKEN"; echo ""
echo "done."
