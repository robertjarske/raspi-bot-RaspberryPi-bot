'use strict';

/* eslint-disable */
const expect = require('expect');
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

const mockUsers = [{
  email: 'rob@test.com',
  name: 'robert',
  username: 'rupert',
  password: 'password',
  admin: true
}, {
  email: 'andreas@test.com',
  name: 'andreas',
  username: 'andreas',
  password: 'password'
}, {
  email: 'tom@test.com',
  name: 'tom',
  username: 'tom',
  password: 'password'
}];
let token;
let userId;

beforeEach(done => {
  User.remove({}).then(() => {
    return User.insertMany(mockUsers);
  }).then(() => done());
});

describe('POST auth/register', () => {
  it('should register a new user', done => {
    const newUser = {
      email: 'testuser@test.com',
      name: 'testuser',
      username: 'testusername',
      password: 'testpassword'
    };

    request(app).post('/auth/register').send(newUser).expect(200).expect(res => {
      expect(res.body.authenticated).toBe(true);
    }).end((err, res) => {
      if (err) return done(err);

      User.findOne({ email: newUser.email }).then(user => {
        expect(user.name).toBe(newUser.name);
        done();
      }).catch(e => done(e));
    });
  });

  it('should not register a new user with invalid req.body', done => {
    const invalidNewUser = {
      email: '',
      name: '',
      username: '',
      password: ''
    };

    request(app).post('/auth/register').send(invalidNewUser).expect(500).expect(res => {
      expect(res.body.msg.errors.email.message).toBe('You need to register an email');
    }).end((err, res) => {
      if (err) return done(err);

      User.find().then(users => {
        expect(users.length).toBe(3);
        done();
      }).catch(e => done(e));
    });
  });
});

describe('POST /auth/login', () => {
  it('should log in user', done => {

    request(app).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
    }).end((err, res) => {
      if (err) return done(err);
      done();
    });
  });
});

describe('GET /users', () => {
  it('should get all users if admin', done => {

    request(app).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(app).get('/users').set('x-access-token', token).expect(200).expect(res => {
        expect(res.body.users.length).toBe(3);
      }).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });
});

describe('GET /users/:id', () => {
  it('should get user by id if admin', done => {

    request(app).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(app).get('/users').set('x-access-token', token).expect(200).expect(res => {
        expect(res.body.users.length).toBe(3);
        userId = res.body.users[0]._id;
      }).end(() => {
        request(app).get(`/users/${userId}`).set('x-access-token', token).expect(200).expect(res => {
          expect(res.body.user._id).toBe(userId);
        }).end((err, res) => {
          if (err) return done(err);
          done();
        });
      });
    });
  });
});