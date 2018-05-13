var mongoose = require('mongoose');
var Bank = require('../models/bank');
var Bank = require('../models/customer');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');


var busboy = require('connect-busboy');
var parse = require('csv-parse')
const ropsten_infura = "https://ropsten.infura.io/aXEcZ6ADvJtlki8J7hzG"

const ethereumUri = "http://localhost:8545";
//const infura = "https://mainnet.infura.io/VsHV1w7NZ0n5MLQLojSY";
web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

const abii = [{"constant":false,"inputs":[{"name":"ethAcc","type":"address"}],"name":"getBankName","outputs":[{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"Uname","type":"string"},{"name":"bankAddress","type":"address"}],"name":"ifAllowed","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"ethAccount","type":"address"}],"name":"verifyBank","outputs":[{"name":"","type":"int256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"ethAddress","type":"address"},{"name":"certificateInc","type":"string"},{"name":"license","type":"string"},{"name":"headquarter","type":"string"},{"name":"email","type":"string"},{"name":"phoneNumber","type":"string"},{"name":"constitutionDate","type":"string"}],"name":"addBank","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"ethAccount","type":"address"}],"name":"isBankVerified","outputs":[{"name":"b","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"bankAccount","type":"address"}],"name":"isPartOfOrg","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"fname","type":"string"},{"name":"lname","type":"string"},{"name":"dataHash","type":"string"},{"name":"ethAddress","type":"address"},{"name":"country","type":"string"},{"name":"birthdate","type":"string"},{"name":"bankAccount","type":"address"}],"name":"addCustomer","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"ethAccount","type":"address"}],"name":"verifyCustomer","outputs":[{"name":"","type":"int256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"ethAccount","type":"address"}],"name":"isCustomerVerified","outputs":[{"name":"b","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bankAddress","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"addedBank","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"customerAddress","type":"address"},{"indexed":false,"name":"fname","type":"string"}],"name":"addedCustomer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"customerAddress","type":"address"}],"name":"notAddedCustomer","type":"event"}];
const devAdd = web3.eth.accounts[0]; //Authority, Trusted Party
const smart_contract_address = "0x292bB4986f3fcb10D800D155fD7e880940e36718";
var Mycontract = web3.eth.contract(abii);
var myContractInstance = Mycontract.at(smart_contract_address);
//console.log(devAdd)



module.exports.addBank = function (req, res) {
  web3.personal.unlockAccount(devAdd, "");
  var ethAddress;
  //Create an account for the bank
  web3.personal.newAccount('', function(err,data){
    if(err)
      res.send("problem creating the account for bank")
    console.log(data)
    ethAddress=data;
    web3.personal.unlockAccount(ethAddress, '');
    console.log("Eth Address created is : "+ethAddress)
    //Transfer money to the ac,count from the dev account
    //web3.eth.sendTransaction({to:ethAddress, from:devAdd, value:web3.toWei("0.5", "ether")})
   console.log(req.body.name)
    var returnedValue = myContractInstance.addBank(
       req.body.name,
       ethAddress,
       req.body.certificateInc,
       req.body.license,
       req.body.headquarter,
       req.body.email,
       req.body.phoneNumber,
       req.body.constitutionDate,
      
   { from: devAdd, gas: 999999 }
 );
   console.log(returnedValue)
  res.send({"key":ethAddress})
  })
//res.send("not added")

};


module.exports.addCustomer = function (req, res) {
  web3.personal.unlockAccount(devAdd, "");
  var ethAddress;
  //Create an account for the customer
  web3.personal.newAccount('', function(err,data){
    if(err)
      res.send("problem creating the account for customer")
    console.log(data)
    ethAddress=data;
    web3.personal.unlockAccount(ethAddress, '');
    web3.personal.unlockAccount(req.body.bankAccount, '');
    console.log("Eth Address created for customer is : "+ethAddress)
    //Transfer money to the ac,count from the dev account
    //web3.eth.sendTransaction({to:req.body.bankAccount, from:devAdd, value:web3.toWei("0.5", "ether")})
   //console.log(req.body.name)
    var returnedValue = myContractInstance.addCustomer(
      req.body.fname,
      req.body.lname,
      req.body.dataHash,
      ethAddress,
      req.body.country,
      req.body.birthdate,
      req.body.bankAccount,
      
   { from: req.body.bankAccount, gas: 999999 }
 );
  console.log(returnedValue)
  res.send({"key":ethAddress})
  })


};

//The trusted party verifies the bank/customer identity

module.exports.verifyCustomer = function (req, res){
  
  web3.personal.unlockAccount(devAdd, "");
  var returnedValue = myContractInstance.verifyCustomer(
      req.params.ethAccount,
  { from: devAdd, gas: 999999 });
//console.log(returnedValue)
var returnedValue = myContractInstance.isCustomerVerified(req.params.ethAccount).toNumber();
if(returnedValue == 1)
  //the case where the customer's identity got verified by the trusted authority
  res.send({"verified":"true"})
else
  //the case where the customer's verification got rejected by the trusted authority 
  res.send({"verified":"false"})

}

module.exports.verifyBank = function (req, res){
  
  web3.personal.unlockAccount(devAdd, "");
  var returnedValue = myContractInstance.verifyBank(
      req.params.ethAccount,
  { from: devAdd, gas: 999999 });
//console.log(returnedValue)
var returnedValue = myContractInstance.isBankVerified(req.params.ethAccount).toNumber();
if(returnedValue == 1)
  //the case where the bank's identity got verified by the trusted authority
  res.send({"verified":"true"})
else
  //the case where the bank's verification got rejected by the trusted authority 
  res.send({"verified":"false"})

}

module.exports.bIsVerified = function (req, res){
  
  web3.personal.unlockAccount(devAdd, "");
  //console.log(returnedValue)
  var returnedValue = myContractInstance.isBankVerified(req.params.ethAccount).toNumber();
  if(returnedValue == 1)
    //the case where the bank's identity got verified by the trusted authority
    res.send({"verified":"true"})
  else
    //the case where the bank's verification got rejected by the trusted authority 
    res.send({"verified":"false"})

}

module.exports.cIsVerified = function (req, res){
  
var returnedValue = myContractInstance.isCustomerVerified(req.params.ethAccount).toNumber();
if(returnedValue == 1)
  //the case where the customer's identity got verified by the trusted authority
  res.send({"verified":"true"})
else
  //the case where the customer's verification got rejected by the trusted authority 
  res.send({"verified":"false"})

}






