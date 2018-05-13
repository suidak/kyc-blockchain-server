var express = require('express');
var router = express.Router();
var kyc = require('../controllers/kycController');
router.post('/bank', kyc.addBank);
router.post('/customer', kyc.addCustomer);
router.get('/verifycustomer/:ethAccount', kyc.verifyCustomer);
router.get('/verifybank/:ethAccount', kyc.verifyBank);
router.get('/customerisverified/:ethAccount', kyc.cIsVerified);
router.get('/bankisverified/:ethAccount', kyc.bIsVerified);

module.exports = router;