Welcome to "FinChain"!
=========
This is a NodeJS/ExpressJS server that communicates with an Ethereum Blockchain using Web3JS API and exposes a REST API.

### Project Requirements
You need to have the following installed in your machine:
1) Parity Ethereum Client
2) NPM
3) MongoDB


### Run an Ethereum Client
Open your **commandline** terminal and type the following command:
>parity --chain dev --no-ui --jsonrpc-apis eth,net,web3,personal

### Run MongoDB
Open your **commandline** terminal and type the following command:
>mongod

### Run the project
Browse to the project directory and run npm i which will install the node_modules. Then run the following command:
>npm start

The project is running on the 3000 PORT. 

### REST API
Here are the endpoints exposed:
POST /kyc/bank
POST /kyc/customer
GET /verifycustomer/[accountAddress]
GET /verifybank/[accountAddress]
GET /kyc/customerisverified/[accountAddress]
GET /kyc/bankisverified/[accountAddress]





