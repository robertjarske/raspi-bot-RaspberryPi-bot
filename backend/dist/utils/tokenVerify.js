'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenVerify = tokenVerify;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../db/config/config');

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenVerify(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ authenticated: false, msg: 'Unauthorized. No token provided' });
  }

  return _jsonwebtoken2.default.verify(token, _config.SECRET.secret, (error, decodedToken) => {
    if (error) {
      let message = '';
      switch (error.name) {
        case 'TokenExpiredError':
          message = 'The token has expired';
          break;
        case 'JsonWebTokenError':
          message = 'There seems to be an error with your token, please logout and login again';
          break;
        default:
          message = 'An error occurred when trying to authenticate token';
          break;
      }

      return res.status(500).send({ authenticated: false, msg: message });
    }

    return _User2.default.findById(decodedToken.id, { password: 0 }).select('-password').then(user => {
      if (user == null) return res.status(404).send({ msgType: 'danger', msg: 'No user found' });
      req.user = user;
      req.userId = decodedToken.id;

      return next();
    });
  });
}