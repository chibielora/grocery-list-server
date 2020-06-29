#!/bin/bash

API="http://localhost:4741"
URL_PATH="/list/${LIST_ID}/grocery"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "grocery": {
      "name": "'"${NAME}"'",
      "marked": false
    }
  }'

echo
