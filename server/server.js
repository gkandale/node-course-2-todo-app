const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/todos', (req, res) => {
    todo.find().then((todo) => {
      res.send({todo});
    }, (e) => {
        res.status(400).send(e);
    })
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

app.listen(3000, () => {
   console.log('Started on port 3000');
});

module.exports = { app };