//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const keys = require('../config/keys');

MongoClient.connect(keys.mongoURI,(err,client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connect to MongoDB server');
    const db = client.db('blog_dev');

    db.collection('todos').insertOne({
        "text": "remove tree stumps",
        "completed": "true"
    }, (err,results) => {
        if (err){
            return console.log('Unable to insert todos', err);
        }
        console.log(JSON.stringify(results.ops, undefined, 2));
    });

    // db.collection('users').insertOne({
    //     "username": "gkandale27",
    //     "FullName": "George Kendalepas",
    //     "age": 49,
    //     "location": "D'Sicks"
    // }, (err,results) => {
    //     if (err){
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(JSON.stringify(results.ops, undefined, 2));
    //     console.log(results.ops[0]._id.getTimestamp());
    // });

    client.close();
});

