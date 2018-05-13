var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/votingdb";

// url to connect to mongodb on mlab.com - check it out, it's simple and easy to use
// var url = "mongodb://nossa:go%24myvote123@ds153577.mlab.com:53577/gmvdb"

mongoose.connect(url, function(err, result){
    if(err)
        return console.log("Could not connect");
    else
    return console.log("connected");
});

module.exports = mongoose;