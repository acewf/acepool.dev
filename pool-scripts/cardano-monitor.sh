#!/bin/bash
#!/bin/sh
# path to jcli
JCLI="./jcli"
JCLI_PORT=3100
JCLI_HOST="http://127.0.0.1:${JCLI_PORT}/api"
JCLI_STATS="$JCLI rest v0 node stats"

# path to log file
LOG_FILE=./logs/block.log

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
PLATFORM="sendmytip.sh"

TIP_URL="$POOL_TOOL?poolid=${MY_POOL_ID}&userid=${MY_USER_ID}&genesispref=${THIS_GENESIS}"

send_tip(){
  SERVICE_TIP="$TIP_URL&mytip=${LATEST_BLOCK}&lasthash=${LAST_BLOCK_HASH}&lastpool=${LAST_POOL_ID}&lastparent=${LAST_PARENT}&lastslot=${LATEST_SLOT}&lastepoch=${EPOCH}"
  curl -s -G --data-urlencode "platform=${PLATFORM}" --data-urlencode "jormver=${NODE_VERSION}" "$SERVICE_TIP"
}

get__NodeInfo(){
  NODE_VERSION=$($JCLI_STATS get --host ${JCLI_HOST} | grep version | awk '{print $3}')
  LATEST_BLOCK=$($JCLI_STATS get --host ${JCLI_HOST} | grep lastBlockHeight | awk '{print $2}' | rev | cut -c 2- | rev | cut -c 2-)
  LATEST_SLOT=$($JCLI_STATS get --host ${JCLI_HOST} | grep lastBlockDate | awk '{print $2}' | rev | cut -c 2- | rev | cut -c 6- )
  LAST_BLOCK_TIME=$($JCLI_STATS get --host ${JCLI_HOST} | grep lastBlockTime | awk '{print $2}' | cut -c 13- | rev | cut -c 8- | rev)
  LAST_BLOCK_HASH=$($JCLI_STATS get --host ${JCLI_HOST} | grep lastBlockHash | awk '{print $2}')
  LAST_BLOCK=$($JCLI rest v0 block $LAST_BLOCK_HASH get --host ${JCLI_HOST})
  EPOCH=$($JCLI_STATS get --host ${JCLI_HOST} | grep lastBlockDate | awk '{print $2}' | cut -c -4 | cut -c 2- )
  LAST_POOL_ID=${LAST_BLOCK:168:64}
  LAST_PARENT=${LAST_BLOCK:104:64}
}

send__InstanceInfo(){
  echo $1
cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/cardano/instance/jormun
  $1
EOF
}

save__log(){
  data=$1
  echo "$data" >> ${LOG_FILE}
}

while true
do
    DATE=$(date '+%Y-%m-%d')
    TIME=$(date '+%H:%M:%S')
    SECONDS=$(date +%s)
    get__NodeInfo
    if [ "$LATEST_BLOCK" > 0 ]; then
        if [ "$LATEST_BLOCK" != "$LAST_BLOCK" ]; then
            START_TIME=$(($SECONDS))
            TIME_BOOTSTRAPING=$SECONDS
            nodeData="jormungandr_usage{epoch=\""${EPOCH}"\", slot=\""${LATEST_SLOT}"\", explorer=\""${LAST_BLOCK_TIME}"\", block=\""${LATEST_BLOCK}"\"} 1"
            send__InstanceInfo "$nodeData"
            save__log "$nodeData"
            send_tip
            LAST_BLOCK="$LATEST_BLOCK"
            if [ "$EPOCH" != "$LATEST_EPOCH" ]; then
               source ./send_slots
               save__log "Sending Slots to pooltool.io"
            fi
            LATEST_EPOCH="$EPOCH"
        else
            ELAPSED_TIME=$(($SECONDS - $START_TIME))
            save__log "Block Stuck at ELAPSED_TIME:$ELAPSED_TIME LAST_BLOCK:$LAST_BLOCK}"
            if [ "$ELAPSED_TIME" -gt "$RESTART_GT" ]; then
              nodeData="jormungandr_usage{epoch=\""${EPOCH}"\", slot=\""${LATEST_SLOT}"\", explorer=\""${LAST_BLOCK_TIME}"\", block=\""${LATEST_BLOCK}"\"} 0"
              send__InstanceInfo "$nodeData"
              sudo killall jormungandr
              LAST_BLOCK="$LATEST_BLOCK"
              echo "Sleeping for 90 sec."
              sleep 90
            fi
        fi
    else
        START_TIME=$(($SECONDS))
        save__log "Waiting on bootstrap $(($SECONDS - $TIME_BOOTSTRAPING))"
        if [[ $(($SECONDS - $TIME_BOOTSTRAPING)) -gt 500 ]]; then
          save__log "Kill jormungandr $(($SECONDS - $TIME_BOOTSTRAPING))"
          sudo killall jormungandr
        fi
    fi
    sleep 20
done

exit 0
