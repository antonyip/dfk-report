## Introduction
This application will: 
- Generate a complete transaction history report for any wallet over any customized time frame
- Account for every smart contract transaction in the game with a clear line item that is tagged with transaction type and whether this was awarded via a quest, payment, sell of hero, and the price change when sold relative to when received
- Quantify all gains and losses for the wallet address entered
- Have a mechanism for easily adding all new DFK smart contracts as they are released
- Be able to track transactions across multiple EVM based blockchains
- Bonus points for accommodating other currencies than USD 

## Development
### Pre-reqs
- install nvm `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
- install node `bash && nvm install 14`

### Development Loop
- `nvm use 14`
- `npm install`
- `npm start`
change things
