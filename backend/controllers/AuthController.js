/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../db/config/config';
import User from '../models/User';
import { tokenVerify } from '../utils/tokenVerify';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const {
    email,
    name,
    username,
    password,
  } = req.body;

  User.create(
    {
      name,
      username,
      email,
      password,
      avatar: `https://api.adorable.io/avatars/150/${name}@adorable.png`,
    },
  )
    .then((user) => {
      const token = jwt.sign({ id: user._id }, SECRET.secret, {
        expiresIn: 86400,
      });

      return res.status(200).send({
        authenticated: true,
        token,
        user: {
          _id: user._id,
          admin: user.admin,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
        msgType: 'success',
        msg: 'Successfully Created Account',
      });
    })
    .catch((error) => {
      if (error.code === 11000 || error.code === 11001) {
        const dublicate = 'Seems we already have someone with that email';
        return res.status(500).send({ authenticated: false, msgType: 'danger', msg: dublicate });
      }
      return res.status(500).send({ authenticated: false, msg: error });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          authenticated: false,
          token: null,
          user: null,
          msgType: 'danger',
          msg: 'No registered user found with that email',
        });
      }

      const isValidPassword = bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).send({
          authenticated: false,
          token: null,
          user: null,
          msgType: 'danger',
          msg: 'Invalid Email or Password',
        });
      }

      const token = jwt.sign({ id: user._id }, SECRET.secret, {
        expiresIn: 86400,
      });


      return res.status(200).send({
        authenticated: true,
        token,
        user: {
          _id: user._id,
          admin: user.admin,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
        msgType: 'success',
        msg: 'Successfully Logged In',
      });
    })
    .catch(() => res.status(500).send({ authenticated: false, msg: 'An error occurred when trying to log in' }));
});

router.get('/me', tokenVerify, (req, res) => {
  const { user } = req;
  if (!user) return res.status(404).send({ msg: 'User not found' });

  return res.status(200).send({ authenticated: true, user });
});

module.exports = router;
