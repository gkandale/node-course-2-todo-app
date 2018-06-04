const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { todo } = require('./models/todo');
const { user } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todos = new todo({
        text: req.body.text
    });

    todos.save().then((doc)=>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    //console.log(req.body);
});

app.post('/users', (req, res) => {
    var users = new user({
        email: req.body.email
    });

    users.save().then((doc)=>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    todo.find().then((todo) => {
      res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;

    if ( !ObjectID.isValid(id) ) {
        return res.status(404).send();
    }

    todo.findById(id).then((todo) => {
    if (!todo){
        return res.status(404).send();
    }
    res.send({todo});
    //console.log('Todo by ID', todo);
    }).catch((e) => res.status(400).send());
});

app.listen(3000, () => {
   console.log('Started on port 3000');
});

module.exports = { app };