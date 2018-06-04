const { MongoClient, ObjectID } = require('mongodb');
const keys = require('../config/keys');

MongoClient.connect(keys.mongoURI,(err,client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connect to MongoDB server');

    const db = client.db('blog_dev');

    //DeleteMany mongo query
    db.collection('users').findOneAndDelete({_id: new ObjectID('5b120fd5ca14bf069624a3c0')}).then((result) => {
        console.log(JSON.stringify(result));
    });

    // //DeleteOne mongo query
    // db.collection('todos').deleteOne({text: 'remove tree stumps'}).then((result) => {
    //     console.log(`todos results ${result}`);
    // });
    //
    // //FindOneAndDelete mongo query
    // db.collection('todos').deleteMany({text: 'remove tree stumps'}).then((result) => {
    //     console.log(`todos results ${JSON.stringify(result)}`);
    // });

    client.close();
});