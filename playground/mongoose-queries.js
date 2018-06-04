const { ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { todo } = require('./../server/models/todo');
const { user } = require('./../server/models/user');

// var id = '5b157cf1ef14e10423dbbdee12';
//
// if ( ObjectID.isValid() ) {
//     console.log('ID not valid up top');
// }
//
// todo.find({
//    _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
//
// todo.findById(id).then((todo) => {
//     if (!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

var id = '5b15b85e0ceff00979cc0718';

if ( ObjectID.isValid() ) {
    console.log('ID is valid up top');
}

user.find({
    _id: id
}).then((users) => {
    console.log('Users', users);
});

user.findOne({
    _id: id
}).then((user) => {
    console.log('User', user);
});

user.findById(id).then((user) => {
    if (!user){
        return console.log('ID not found');
    }
    console.log('User by ID', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));