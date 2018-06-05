const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { todo } = require('./models/todo');
const { user } = require('./models/user');
const { accounts } = require('./models/accounts');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/users', (req, res) => {
    user.find().then((user) => {
        res.send({user});
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



app.get('/rest/accounts', (req,res) => {
    accounts.find().then((accounts) => {
        res.send({accounts});
    }, (e) => {
        res.status(400).send(e);
    })
});


app.get('/rest/account/:username', (req,res) => {
    var user = req.params.username;

    accounts.find({username: user}).then((accounts) => {
        if (!accounts){
            return res.status(404).send();
        }
        res.send({accounts});
    }).catch((e) => res.status(404).send());
});

app.post('/rest/account', (req, res) => {
    var account = new accounts({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        acountNumb: new ObjectID() + Math.random(100000)
    });

    account.save().then((doc)=>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/rest/account/:username', (req, res) => {
    var user = req.params.username;

    accounts.findOneAndRemove({username: user}).then((accounts) => {
        if (!accounts){
            return res.status(404).send();
        }
        res.send({accounts});
    }).catch((e) => res.status(404).send());
});

app.listen(port, () => {
   console.log(`Started on port ${port}`);
});

module.exports = { app };