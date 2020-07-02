#!/bin/sh

API="http://localhost:4741"
URL_PATH="/list/${LIST_ID}/grocery"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo