#!/bin/bash

/root/jormungandr --genesis-block-hash $(cat /root/genesis-hash.txt) --config /root/stakepool-config.yaml --secret /root/node_secret.yaml
processId=$(ps -ef | grep 'jormungandr' | grep -v 'grep' | awk '{ printf $2 }')

while kill -0 $processId 2> /dev/null; do
  sleep 1
done

exit 0
