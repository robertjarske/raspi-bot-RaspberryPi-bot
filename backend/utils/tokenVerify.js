import jwt from 'jsonwebtoken';
import { SECRET } from '../db/config/config';
import User from '../models/User';

export function tokenVerify(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(401)
      .send({ authenticated: false, msg: 'Unauthorized. No token provided' });
  }

  return jwt.verify(token, SECRET.secret, (error, decodedToken) => {
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

    return User.findById(decodedToken.id, { password: 0 }).then((user) => {
      req.user = user;
      req.userId = decodedToken.id;

      next();
    });
  });
}
