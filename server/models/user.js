var mongoose = require('mongoose');

var user = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

// var newUser = new user({
//     email: 'gkandale@gmail.com'
// });
//
// newUser.save().then((doc) => {
//     console.log('Saved user ', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
// });

module.exports = {user};