/* eslint-disable */
const expect = require('expect');
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');


beforeEach((done) => {
  User.remove({}).then(() => done());
});

describe('POST auth/register', () => {
  it('should register a new user', (done) => {
    const newUser = {
      email: 'testuser@test.com',
      name: 'testuser',
      username: 'testusername',
      password: 'testpassword',
    }

    request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(200)
      .expect((res) => {
        expect(res.body.authenticated).toBe(true);
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findOne({ email: newUser.email }).then((user) => {
          expect(user.name).toBe(newUser.name);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not register a new user with invalid req.body', (done) => {
    const invalidNewUser = {
      email: '',
      name: '',
      username: '',
      password: '',
    }

    request(app)
    .post('/auth/register')
    .send(invalidNewUser)
    .expect(500)
    .expect((res) => {
      expect(res.body.msg.errors.email.message).toBe('You need to register an email')
    })
    .end((err, res) => {
      if (err) return done(err);

      User.find().then((users) => {
        expect(users.length).toBe(0);
        done();
      }).catch(e => done(e));
    })
  })
});
