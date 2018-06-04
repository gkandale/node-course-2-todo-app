const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { todo } = require('./models/todo');
const { user } = require('./models/user');

let app = express();

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

app.listen(3000, () => {
   console.log('Started on port 3000');
});