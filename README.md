# OP Subgraph

Subgraph for the keeper-contracts v0.12.7

### Local Development

#### Install tools and start Ganache

Install dependencies:

```sh
npm install -g ganache-cli truffle @graphprotocol/graph-cli
```

#### Start a local Graph Node

This assumes you already have Ganache running and have performed
the above migration steps.

1. Clone `https://github.com/decentraminds/op-subgraph`
2. Install dependencies `op-subgraph`
   ```sh
   cd op-subgraph
   yarn
   ```
3. Copy network smart contracts either from the keeper-contracts package or from your local Barge
   ```sh
   sh scripts/keeper-latest.sh pacific
   # or
   sh scripts/keeper-docker.sh # For barge
   ```
3. In another terminal, start a local Graph Node that will connect to the Pacific Network:
   ```sh
   docker-compose up
   ```

#### Deploy the subgraph to the local Graph Node

1. Deploy the subgraph to your local Graph Node:
   ```sh
   yarn create-local
   yarn build
   yarn deploy-local
   ```