# Charity
Charity is a simple charity react web app built for the Ethereum blockchain. Donation requester creates a charity and donation requests. People see a list of charity and donate money to charity. If they donate to a charity, they become approvers. If donation requester get enough approve and money, finalize this request and send money to the recipient. 
 
### Features
- create a charity
- view a list of charities
- create donation requests and view requests for charity
- view a donation balance, minimum donation, pending requests and approvers in a charity
- donate to charity and become approver
- approver can approve each request. 
- if enough approvers and money, donation requestor finalize and send money to the recipient.

### Technologies Used
- Web3
- Solidity
- Mocha
- Truffle
- Ganache CLI
- NextJS
- Next Routes
- React
- Semantic UI React

### Installation
- `git clone`
- `npm install`
- place your 12-word mnemonic private key at the location charity/ethereum/deploy.js.
`const mnemonicPhrase = “”;`
- to deploy. go to charity/ethereum/deploy.js and run
`node deploy.js`
copy contract deployed address and update this address to charity/ethereum/factory.js.
- at package.json
`"scripts": {
    "test": "mocha",
    "dev": "next dev"
  }`
- finally, `npm run dev`
