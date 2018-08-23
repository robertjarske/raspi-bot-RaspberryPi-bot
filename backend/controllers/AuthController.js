/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
import User from '../models/User';
import { tokenVerify } from '../utils/tokenVerify';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const {
    email, name, username, password,
  } = req.body;

  User.create(
    {
      name,
      username,
      email,
      password,
      avatar: `https://api.adorable.io/avatars/285/${name}@adorable.png`,
    },
    (error, user) => {
      if (error) {
        if (error.code === 11000 || error.code === 11001) {
          const dublicate = 'Seems we already have someone with that email';
          return res.status(500).send({ authenticated: false, msg: dublicate });
        }
        return res.status(500).send({ authenticated: false, msg: error });
      }

      const token = jwt.sign({ id: user._id }, SECRET.secret, {
        expiresIn: 86400,
      });
      return res.status(200).send({ authenticated: true, token });
    },
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(500).send('An error occurred when trying to log in');
    }

    if (!user) {
      return res.status(404).send('No registered user found with that email');
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        authenticated: false,
        token: null,
      });
    }

    const token = jwt.sign({ id: user._id }, SECRET.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({
      authenticated: true,
      token,
    });
  });
});

router.get('/me', tokenVerify, (req, res) => {
  const { user } = req;
  if (!user) return res.status(404).send({ msg: 'User not found' });

  return res.status(200).send({ authenticated: true, user });
});

module.exports = router;
