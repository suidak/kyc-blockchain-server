var mongoose = require('mongoose');
var OptionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  photo : {
    type: String
  }

})

var VoterSchema = new mongoose.Schema({
  key: {
    type: String
  },
  valid: {
    type: Boolean, default: true
  }

})
var ElectionSchema = new mongoose.Schema({
  title: {
    type: String
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date
  },
  duration: {
    type: Number, default: 84600000
  },
  status: {
    type: String,
    enum: ['ongoing', 'paused', 'finished'],
    default: 'ongoing'
  },
  smart_contract: {
    contract_abi: {
      type: Object
    },
    contract_address: {
      type: String
    }
  },
  options: [OptionSchema],
  voters: [VoterSchema],
  launcher: {
    type: String
  }, //change it to user
  contract: {
    type: String
  }

})

module.exports = mongoose.model('Elections', ElectionSchema);