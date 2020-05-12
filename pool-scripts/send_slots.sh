#!/usr/bin/env bash

## Script from https://github.com/papacarp/pooltool.io/tree/master/send_slots/shell
MY_POOL_ID="f43275bf7f178f5493ef4d5cfc35f6d944d7e65e3e09cf51791aec46e653dad2"
MY_USER_ID="e9021c49-d935-43d3-bcde-acb07efd8d50"
THIS_GENESIS="8e4d2a343f3dcf93"

## CHANGE BELOW VARIABLES TO DETERMINE WHAT YOU UPLOAD TO POOLTOOL (EITHER GPG OR HASH)
VERIFY_SLOTS_GPG=true
VERIFY_SLOTS_HASH=false

RESTAPI_PORT="3100"

## KEY LOCATION STORES THE EPOCHS DATA - DON'T REMOVE THIS DIRECTORY NOR SET IT TO /tmp
## IF YOU DO, SEND_SLOT WILL FAIL VALIDATION OF MINTED BLOCKS
KEY_LOCATION="${HOME}/keystorage"
LOG_FILE=/root/logs/sendBlocks.log

## TESTING IF VARIABLES ARE SET
if [ -z "$MY_POOL_ID" ] || [ -z "$MY_USER_ID" ] || [ -z "$THIS_GENESIS" ] || [ -z "$KEY_LOCATION" ]; then
    echo "One or more variables not set."
    echo "MY_POOL_ID = $MY_POOL_ID"
    echo "MY_USER_ID = $MY_USER_ID"
    echo "THIS_GENESIS = $THIS_GENESIS"
    echo "KEY_LOCATION = $KEY_LOCATION"
    exit 1
fi

## LET'S MAKE SURE THE KEY_LOCATION DIRECTORY EXISTS
if ! [ -d "$KEY_LOCATION" ]; then
    if ! mkdir -p "$KEY_LOCATION"; then
        echo "ERROR: UNABLE TO CREATE KEY DIRECTORY. PLEASE CREATE MANUALLY WITH \"sudo mkdir -p $KEY_LOCATION\""
        exit 2
    fi
fi

## LET'S SET THE REST API URL FOR CURL
if [ ! "$JORMUNGANDR_RESTAPI" ]; then
    JORMUNGANDR_RESTAPI="http://127.0.0.1:${RESTAPI_PORT}"
fi

## CALCULATING THE NEEDED EPOCHS
chainstartdate=1576264417
elapsed=$((($(date +%s) - chainstartdate)))
CURRENT_EPOCH=$(((elapsed / 86400)))
PREVIOUS_EPOCH=$((CURRENT_EPOCH - 1))
CURRENT_SLOTS=$(curl -s ${JORMUNGANDR_RESTAPI}/api/v0/leaders/logs | jq -c '[ .[] | select(.scheduled_at_date | startswith('\"$CURRENT_EPOCH\"')) ]')
ASSIGNED_SLOTS=$(echo "$CURRENT_SLOTS" | jq '. | length')

if [ VERIFY_SLOTS_GPG ]; then
    ## GENERATING SYMMETRIC KEY FOR CURRENT EPOCH AND RETRIEVING PREVIOUS EPOCH KEY
    if [ -f "${KEY_LOCATION}/passphrase_${PREVIOUS_EPOCH}" ]; then
        PREVIOUS_EPOCH_KEY=$(cat "${KEY_LOCATION}"/passphrase_${PREVIOUS_EPOCH})
    else
        PREVIOUS_EPOCH_KEY=""
    fi

    if [ -f "${KEY_LOCATION}/passphrase_${CURRENT_EPOCH}" ]; then
        CURRENT_EPOCH_KEY=$(cat "${KEY_LOCATION}"/passphrase_"${CURRENT_EPOCH}")
    else
        CURRENT_EPOCH_KEY=$(openssl rand -base64 32 | tee "${KEY_LOCATION}"/passphrase_"${CURRENT_EPOCH}")
    fi

    ## ENCRYPTING CURRENT SLOTS FOR SENDING TO POOLTOOL
    CURRENT_SLOTS_ENCRYPTED=$(echo "$CURRENT_SLOTS" | gpg --symmetric --armor --batch --passphrase "${CURRENT_EPOCH_KEY}")

    ## CREATING JSON FOR SENDING TO POOLTOOL
    JSON="$(jq -n --compact-output --arg CURRENTEPOCH "$CURRENT_EPOCH" --arg POOLID "$MY_POOL_ID" --arg USERID "$MY_USER_ID" --arg GENESISPREF "$THIS_GENESIS" --arg ASSIGNED "$ASSIGNED_SLOTS" --arg KEY "$PREVIOUS_EPOCH_KEY" --arg SLOTS "$CURRENT_SLOTS_ENCRYPTED" '{currentepoch: $CURRENTEPOCH, poolid: $POOLID, genesispref: $GENESISPREF, userid: $USERID, assigned_slots: $ASSIGNED, previous_epoch_key: $KEY, encrypted_slots: $SLOTS}')"
    echo "Packet Sent: $JSON" >> ${LOG_FILE}
    echo "Response Received: $(curl -s -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "$JSON" "https://api.pooltool.io/v0/sendlogs")"
    exit 3
fi

if [ VERIFY_SLOTS_HASH ]; then
    ## PUSHING THE CURRENT SLOTS TO FILE AND GETTING THE SLOTS FROM THE LAST EPOCH.
    if [ -f "${KEY_LOCATION}/leader_slots_${PREVIOUS_EPOCH}" ]; then
        LAST_EPOCH_SLOTS=$(cat "${KEY_LOCATION}"/leader_slots_${PREVIOUS_EPOCH})
    else
        LAST_EPOCH_SLOTS=""
    fi

    if [ ! -f "${KEY_LOCATION}/leader_slots_${CURRENT_EPOCH}" ]; then
        echo -n "$CURRENT_SLOTS" | tee "${KEY_LOCATION}"/leader_slots_"${CURRENT_EPOCH}"
    fi

    ## HASH VERIFICATION VERSION GOES HERE. I KNOW ITS VERBOSE, BUT ITS SO MUCH EASIER FOR PEOPLE TO DECODE AND CUSTOMIZE IF WE KEEP THEM ALL SEPARATE
    CURRENT_EPOCH_HASH=$(echo -n "$CURRENT_SLOTS" | sha256sum | cut -d" " -f1 | tee "${KEY_LOCATION}"/hash_"${CURRENT_EPOCH}")
    JSON="$(jq -n --compact-output --arg CURRENTEPOCH "$CURRENT_EPOCH" --arg POOLID "$MY_POOL_ID" --arg USERID "$MY_USER_ID" --arg GENESISPREF "$THIS_GENESIS" --arg ASSIGNED "$ASSIGNED_SLOTS" --arg HASH "$CURRENT_EPOCH_HASH" --arg SLOTS "$LAST_EPOCH_SLOTS" '{currentepoch: $CURRENTEPOCH, poolid: $POOLID, genesispref: $GENESISPREF, userid: $USERID, assigned_slots: $ASSIGNED, this_epoch_hash: $HASH, last_epoch_slots: $SLOTS}')"
    echo "Packet Sent: $JSON" >> ${LOG_FILE}
    echo "Response Received: $(curl -s -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "$JSON" "https://api.pooltool.io/v0/sendlogs")"
    exit 4
fi

## IF WE GET TO HERE THEN NEITHER VERIFICATION METHOD IS BEING USED. JUST SEND CURRENT SLOTS
JSON="$(jq -n --compact-output --arg CURRENTEPOCH "$CURRENT_EPOCH" --arg POOLID "$MY_POOL_ID" --arg USERID "$MY_USER_ID" --arg GENESISPREF "$THIS_GENESIS" --arg ASSIGNED "$ASSIGNED_SLOTS" '{currentepoch: $CURRENTEPOCH, poolid: $POOLID, genesispref: $GENESISPREF, userid: $USERID, assigned_slots: $ASSIGNED}')"
echo "Packet Sent: $JSON"
echo "Response Received: $(curl -s -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "$JSON" "https://api.pooltool.io/v0/sendlogs")"

exit 5
