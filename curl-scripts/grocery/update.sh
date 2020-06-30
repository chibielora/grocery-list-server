#!/bin/bash

API="http://localhost:4741"
URL_PATH="/grocery"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "grocery": {
      "name": "'"${TEXT}"'",
      "marked": false
    }
  }'

echo
