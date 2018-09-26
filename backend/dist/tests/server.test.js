'use strict';

/* eslint-disable */
const expect = require('expect');
const request = require('supertest');
const server = require('../server');
const User = require('../models/User');
const bcrypt = require('bcrypt');

function hasher(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

const mockUsers = [{
  email: 'rob@test.com',
  name: 'Robert',
  username: 'rupert',
  password: hasher('password'),
  avatar: `https://api.adorable.io/avatars/100/robert@adorable.png`,
  thumbnail: `https://api.adorable.io/avatars/50/robert@adorable.png`,
  admin: true
}, {
  email: 'andreas@test.com',
  name: 'Andreas',
  username: 'andreas',
  password: hasher('password'),
  avatar: `https://api.adorable.io/avatars/100/andreas@adorable.png`,
  thumbnail: `https://api.adorable.io/avatars/50/andreas@adorable.png`
}, {
  email: 'tom@test.com',
  name: 'Tom',
  username: 'tom',
  password: hasher('password'),
  avatar: `https://api.adorable.io/avatars/100/tom@adorable.png`,
  thumbnail: `https://api.adorable.io/avatars/50/tom@adorable.png`
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

    request(server).post('/auth/register').send(newUser).expect(200).expect(res => {
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

    request(server).post('/auth/register').send(invalidNewUser).expect(500).expect(res => {
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

    request(server).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
    }).end((err, res) => {
      if (err) return done(err);
      done();
    });
  });

  it('should not log in a user with invalid req.body', done => {
    const invalidUser = {
      email: 'someemail@thatdoesnotexist.com',
      password: 'pass'
    };

    request(server).post('/auth/login').send(invalidUser).expect(404).expect(res => {
      expect(res.body.msg).toBe('No registered user found with that email');
    }).end((err, res) => {
      if (err) return done(err);

      done();
    });
  });
});

describe('GET /auth/me', () => {
  it('should return the user logged in', done => {

    request(server).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(server).get('/auth/me').set('x-access-token', token).expect(200).expect(res => {
        expect(res.body.user.email).toBe(mockUsers[0].email);
      }).end(done);
    });
  });

  it('should not return the user if token is invalid', done => {

    request(server).get('/auth/me').set('x-access-token', 'invalid-token').expect(500).expect(res => {
      expect(res.body.msg).toBe('There seems to be an error with your token, please logout and login again');
    }).end((err, res) => {
      if (err) return done(err);
      done();
    });
  });
});

describe('GET /users', () => {
  it('should get all users if admin', done => {

    request(server).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(server).get('/users').set('x-access-token', token).expect(200).expect(res => {
        expect(res.body.users.length).toBe(3);
      }).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });

  it('should not get all users if not admin', done => {

    request(server).post('/auth/login').send({ email: mockUsers[1].email, password: mockUsers[1].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(server).get('/users').set('x-access-token', token).expect(404).expect(res => {
        expect(res.body.msg).toBe('You are not allowed to do that');
      }).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });
});

describe('GET /users/:id', () => {
  it('should get user by id if admin', done => {

    request(server).post('/auth/login').send({ email: mockUsers[0].email, password: mockUsers[0].password }).expect(200).expect(res => {
      expect(res.body.token);
      token = res.body.token;
    }).end(() => {
      request(server).get('/users').set('x-access-token', token).expect(200).expect(res => {
        expect(res.body.users.length).toBe(3);
        userId = res.body.users[0]._id;
      }).end(() => {
        request(server).get(`/users/${userId}`).set('x-access-token', token).expect(200).expect(res => {
          expect(res.body.user._id).toBe(userId);
        }).end((err, res) => {
          if (err) return done(err);
          done();
        });
      });
    });
  });
});