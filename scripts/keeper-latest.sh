#!/bin/bash

NETWORK=$1
if [ -z "$1" ]
then
	NETWORK="pacific"
	echo "Setting default network: $NETWORK"
fi

echo "Copying smart contract ABIS for $NETWORK network..."

cp ./node_modules/@oceanprotocol/keeper-contracts/artifacts/*.${NETWORK}.json ./abis

for file in ./abis/*.json
do
  mv "$file" "${file/.${NETWORK}.json/.json}"
done

echo "Done!"