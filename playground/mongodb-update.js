const { MongoClient, ObjectID } = require('mongodb');
const keys = require('../config/keys');

MongoClient.connect(keys.mongoURI,(err,client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connect to MongoDB server');

    const db = client.db('blog_dev');

    db.collection('users').findOneAndUpdate({
        _id: new ObjectID('5b120cfedddaf6fc89bad51d')
    }, {
        $set: {
            FullName: 'George Kandalepas'
        },
        $inc: {
             age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();

    // db.collection('todos').findOneAndUpdate({
    //     _id: new ObjectID('5b120afbf371aef5554f20bc')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    //
    // client.close();
});