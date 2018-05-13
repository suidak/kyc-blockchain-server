var mongoose = require('mongoose');
var Reward = require('./reward')

var UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    private_key: {
        type: String
    },
    vote_keys: [{
        type: String
    }],
    rewards: [{
        rewardId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Reward'
        },
        quantity: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('Users', UserSchema);