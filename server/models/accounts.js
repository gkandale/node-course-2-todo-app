var mongoose = require('mongoose');

var accounts = mongoose.model('accounts', {
    username: {
        type: String,
        index: true,
        unique: true,
        required: true,
        minLength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    acountNumb: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        index: true,
        unique: true
    }
});


module.exports = {accounts};