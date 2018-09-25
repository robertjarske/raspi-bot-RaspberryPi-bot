'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../db/config/config');

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _tokenVerify = require('../utils/tokenVerify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


router.use(_bodyParser2.default.urlencoded({ extended: false }));
router.use(_bodyParser2.default.json());

router.post('/register', (req, res) => {
  const {
    email,
    name,
    username,
    password
  } = req.body;

  _User2.default.create({
    name,
    username,
    email,
    password,
    avatar: `https://api.adorable.io/avatars/100/${name}@adorable.png`,
    thumbnail: `https://api.adorable.io/avatars/50/${name}@adorable.png`
  }).then(user => {
    const token = _jsonwebtoken2.default.sign({ id: user._id }, _config.SECRET.secret, {
      expiresIn: 86400
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
        thumbnail: user.thumbnail
      },
      msgType: 'success',
      msg: 'Successfully Created Account'
    });
  }).catch(error => {
    if (error.code === 11000 || error.code === 11001) {
      const dublicate = 'Seems we already have someone with that email';
      return res.status(500).send({ authenticated: false, msgType: 'danger', msg: dublicate });
    }
    return res.status(500).send({ authenticated: false, msg: error });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  _User2.default.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).send({
        authenticated: false,
        token: null,
        user: null,
        msgType: 'danger',
        msg: 'No registered user found with that email'
      });
    }

    const isValidPassword = _bcrypt2.default.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        authenticated: false,
        token: null,
        user: null,
        msgType: 'danger',
        msg: 'Invalid Email or Password'
      });
    }

    const token = _jsonwebtoken2.default.sign({ id: user._id }, _config.SECRET.secret, {
      expiresIn: 86400
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
        thumbnail: user.thumbnail
      },
      msgType: 'success',
      msg: 'Successfully Logged In'
    });
  }).catch(() => res.status(500).send({ authenticated: false, msg: 'An error occurred when trying to log in' }));
});

router.get('/me', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  if (!user) return res.status(404).send({ msg: 'User not found' });

  return res.status(200).send({ authenticated: true, user });
});

module.exports = router;