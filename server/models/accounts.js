var mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

var actnum = new ObjectID();

var accounts = mongoose.model('accounts', {
    username: {
        type: String,
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
        trim: true
    }
});


module.exports = {accounts};