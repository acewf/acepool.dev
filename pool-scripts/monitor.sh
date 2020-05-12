#!/bin/bash
#!/bin/sh
# path to jcli
JCLI="./jcli"
JCLI_PORT=3100

# path to log file
LOG_FILE=/root/logs/block.log

# network stuff (dont touch)
SECONDS=$(date +%s)
LAST_BLOCK=""
START_TIME=$SECONDS
TIME_BOOTSTRAPING=$SECONDS
# how many seconds should we wait if no blocks show up
RESTART_GT=360

LATEST_EPOCH=""

MY_POOL_ID="f43275bf7f178f5493ef4d5cfc35f6d944d7e65e3e09cf51791aec46e653dad2"
MY_USER_ID="e9021c49-d935-43d3-bcde-acb07efd8d50"  # https://pooltool.io/profile
THIS_GENESIS="8e4d2a343f3dcf93"
POOL_TOOL="https://api.pooltool.io/v0/sharemytip"

TIP_URL="$POOL_TOOL?poolid=${MY_POOL_ID}&userid=${MY_USER_ID}&genesispref=${THIS_GENESIS}"

while true
do
    DATE=$(date '+%Y-%m-%d')
    TIME=$(date '+%H:%M:%S')
    SECONDS=$(date +%s)
    LATEST_BLOCK=$($JCLI rest v0 node stats get --host "http://127.0.0.1:${JCLI_PORT}/api" | grep lastBlockHeight | awk '{print $2}' | rev | cut -c 2- | rev | cut -c 2-)
    LATEST_SLOT=$($JCLI rest v0 node stats get --host "http://127.0.0.1:${JCLI_PORT}/api" | grep lastBlockDate | awk '{print $2}' | rev | cut -c 2- | rev | cut -c 6- )
    LAST_BLOCK_TIME=$($JCLI rest v0 node stats get --host "http://127.0.0.1:${JCLI_PORT}/api" | grep lastBlockTime | awk '{print $2}' | cut -c 13- | rev | cut -c 8- | rev)
    EPOCH=$($JCLI rest v0 node stats get --host "http://127.0.0.1:${JCLI_PORT}/api" | grep lastBlockDate | awk '{print $2}' | cut -c -4 | cut -c 2- )
    LAST_BLOCK_HASH=$(./jcli rest v0 node stats get --host "http://127.0.0.1:3100/api" | grep lastBlockHash | awk '{print $2}')
    LAST_POOL_ID=$(./jcli rest v0 block 9a1144fe70644b5295a57289809f089a0abb30cd634ad17bdc193f31fef48b6b get --host "http://127.0.0.1:3100/api" | cut -c169-232)
    if [ "$LATEST_BLOCK" > 0 ]; then
        if [ "$LATEST_BLOCK" != "$LAST_BLOCK" ]; then
            START_TIME=$(($SECONDS))
            TIME_BOOTSTRAPING=$SECONDS
            nodeData="jormungandr_usage{epoch=\""${EPOCH}"\", slot=\""${LATEST_SLOT}"\", explorer=\""${LAST_BLOCK_TIME}"\", block=\""${LATEST_BLOCK}"\"} 1"
cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/cardano/instance/jormun
  $nodeData
EOF
            echo "${nodeData}" >> ${LOG_FILE}
            curl -G -s "$TIP_URL&mytip=${LATEST_BLOCK}&lasthash=${LAST_BLOCK_HASH}&lastpool=${LAST_POOL_ID}"
            LAST_BLOCK="$LATEST_BLOCK"
            if [ "$EPOCH" != "$LATEST_EPOCH" ]; then
               source ./send_slots
               echo "Sending Slots to pooltool.io" >> ${LOG_FILE}
            fi
            LATEST_EPOCH="$EPOCH"
        else
            ELAPSED_TIME=$(($SECONDS - $START_TIME))
            echo "Block Stuck at: ELAPSED_TIME:\""${ELAPSED_TIME}"\" LAST_BLOCK:\""${LAST_BLOCK}"\" " >> ${LOG_FILE}
            if [ "$ELAPSED_TIME" -gt "$RESTART_GT" ]; then
              nodeData="jormungandr_usage{epoch=\""${EPOCH}"\", slot=\""${LATEST_SLOT}"\", explorer=\""${LAST_BLOCK_TIME}"\", block=\""${LATEST_BLOCK}"\"} 0"
cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/cardano/instance/jormun
  $nodeData
EOF
              sudo killall jormungandr
              LAST_BLOCK="$LATEST_BLOCK"
              echo "Sleeping for 90 sec."
              sleep 90
            fi
        fi
    else
        echo "No block height"
        # Reset time
        START_TIME=$(($SECONDS))
        echo "Waiting on bootstrap $(($SECONDS - $TIME_BOOTSTRAPING))" >> ${LOG_FILE}
        if [[ $(($SECONDS - $TIME_BOOTSTRAPING)) -gt 500 ]]; then
          echo "Kill jormungandr $(($SECONDS - $TIME_BOOTSTRAPING))" >> ${LOG_FILE}
          sudo killall jormungandr
        fi
    fi
    sleep 20
done

exit 0
