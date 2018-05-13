var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
 fname: {
    type: String
  },
  lname: {
    type: String
  },
  dataHash: {
    type: String
  },
  country: {
    type: String
  },
  bankAccount: {
    type: String
  },
  country: {
    type: String
  },
    

})

module.exports = mongoose.model('Customers', customerSchema);