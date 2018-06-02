//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const keys = require('../config/keys');

MongoClient.connect(keys.mongoURI,(err,client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connect to MongoDB server');

    const db = client.db('blog_dev');


    // db.collection('todos').find({
    //     _id: new ObjectID('5b120b1ee9ad5cf5c99a046f')
    // })
    // .toArray().then((docs) => {
    //     console.log('todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });


    // db.collection('todos').find().count().then((count) => {
    //     console.log(`todos count ${count}`);
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });


    db.collection('users').find({FullName: 'George Kandalepas'}).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    client.close();
});