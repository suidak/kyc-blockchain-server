var mongoose = require('mongoose');

var BankSchema = new mongoose.Schema({
  name: {
    type: String
  },
  certificateInc: {
      type: String
  },
  license:{
    type: String
  },
  headquarter:{
    type: String
  },
  email:{
    type: String
  },
  phoneNumber:{
    type: String
  },
  constitutionDate:{
      type:Date
  },
  ethAddress:{
      type:String
  }

})

module.exports = mongoose.model('Banks', BankSchema);