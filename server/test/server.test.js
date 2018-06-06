const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {app} = require('../server');
const {todo} = require('../models/todo');
const {user} = require('../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First Test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

const users = [{
    email: 'gkandale@gmail.com'
}, {
    email: 'skandale@gmail.com'
}];

beforeEach((done) => {todo.remove({})
.then(() => {todo.insertMany(todos)})
.then(() => {user.remove({})})
.then(() => {user.insertMany(users)})
.then(() => done());
});

// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         var text = 'Test todo text';
//
//         request(app)
//             .post('/todos')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//
//                 todo.find({text}).then((todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
//
//     it('should not create with invalid body data', (done) => {
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//
//                 todo.find().then((todos) => {
//                     expect(todos.length).toBe(2);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
// });
// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//
//             request(app)
//                 .get('/todos')
//                 .expect(200)
//                 .expect((res) => {
//                     expect(res.body.todo.length).toBe(2);
//                 })
//                 .end(done);
//     });
// });

// describe('POST /users', () => {
//     it('should create new user', (done) => {
//         var email = 'toronto.maple@leafs.com';
//         request(app)
//             .post('/users')
//             .send({email})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.email).toBe(email);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 user.find({email}).then((users) => {
//                     expect(user.length).toBe(3);
//                     //console.log('Users at [0] = ', users[0].email);
//                     expect(users[0].email).toBe(email);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
//});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var objectIDHex = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${objectIDHex}`)
            .expect(404)
            .end(done);

    });

    it('should return 404 for non-object ids', (done) => {
        var rand = Math.floor(Math.random() * 1000000);
        console.log('Random Number ', rand.toString());
        request(app)
            .get(`/todos/${rand.toString()}`)
            .expect(404)
            .end(done)
    });
});