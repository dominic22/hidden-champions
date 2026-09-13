#!/usr/bin/env bash
#
# Print the config of the six WRC6 automations created by create-wrc6-automations.sh.
#
# Usage:
#   export HA_TOKEN='eyJ...'
#   export HA_URL='http://192.168.178.109:8123'  # optional
#   ./verify-wrc6-automations.sh

set -euo pipefail

TOKEN="${HA_TOKEN:?Set HA_TOKEN to your Home Assistant long-lived access token}"
HA="${HA_URL:-http://192.168.178.109:8123}"

for n in 1 2 3 4 5 6; do
  echo "== wrc6_taste_$n =="
  curl -s -H "Authorization: Bearer $TOKEN" "$HA/api/config/automation/config/wrc6_taste_$n" \
    | python3 -m json.tool
done
