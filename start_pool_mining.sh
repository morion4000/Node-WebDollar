if [ "$WALLET" = "" ]
then
  (sleep 30;echo 10;sleep 5;echo $MINING_POOL_URL;) | npm run commands || true
else
  echo $WALLET > wallet.json
  (sleep 30;echo 4;sleep 5;echo 'wallet.json';sleep 5;echo 7;sleep 5;echo 1;sleep 5;echo 10;sleep 5;echo $MINING_POOL_URL;) | npm run commands || true
fi
