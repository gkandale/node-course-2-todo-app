var mongoose = require('mongoose');


var todo = mongoose.model('todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new todo({
//     text: 'reFry Rice',
//     completed: true,
//     completedAt: 5555555555
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo ', doc);
// }, (e) => {
//     console.log('Unable to save', e);
// });

module.exports = {todo};