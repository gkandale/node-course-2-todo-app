const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {app} = require('./../server');
const {user} = require('./../models/user');

const users = [{
    email: 'gkandale@gmail.com'
}, {
    email: 'skandale@gmail.com'
}];

beforeEach((done) => {user.remove({}).then(() => {
        user.insertMany(users)
    }).then(() => done());
});


describe('POST /users', () => {
    it('should create new user', (done) => {
        var email = 'toronto.maple@leafs.com';
        request(app)
            .post('/users')
            .send({email})
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.find({email}).then((users) => {
                    expect(user.length).toBe(3);
                    //console.log('Users at [0] = ', users[0].email);
                    expect(users[0].email).toBe(email);
                    done();
                }).catch((e) => done(e));
            });
    });
});
