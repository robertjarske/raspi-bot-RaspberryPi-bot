'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _tokenVerify = require('../utils/tokenVerify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.use(_bodyParser2.default.urlencoded({ extended: false }));
router.use(_bodyParser2.default.json());

/** Get all users */
router.get('/', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return _User2.default.find().select('-password').then(users => res.status(200).send({ users })).catch(e => res.status(500).send({ msg: e }));
});

/** Get user by id */
router.get('/:userId', _tokenVerify.tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _User2.default.findOne({ _id: userId }).select('-password').then(userFound => res.status(200).send({ user: userFound })).catch(e => res.status(500).send({ msg: e }));
});

/** Register a user */
router.post('/', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  const {
    email,
    name,
    username,
    password
  } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return _User2.default.create({
    name,
    username,
    email,
    password,
    avatar: `https://api.adorable.io/avatars/100/${name}@adorable.png`,
    thumbnail: `https://api.adorable.io/avatars/50/${name}@adorable.png`
  }).then(newUser => res.status(200).send({
    msgType: 'success',
    msg: 'You successfully registered a new user',
    user: {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      thumbnail: newUser.thumbnail
    }
  })).catch(e => res.status(500).send({ msg: e }));
});

/** Update user */
router.put('/:userId', _tokenVerify.tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  const newUserdata = req.body;

  if (!user.admin && !user._id === userId) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _User2.default.findOneAndUpdate({ _id: userId }, newUserdata, { new: true }).then(updatedUser => res.status(200).send({ msgType: 'success', msg: 'Successfully updated', user: updatedUser })).catch(e => res.status(500).send({ msg: e }));
});

/** Make user admin */
router.put('/:userId/permissions', _tokenVerify.tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _User2.default.findOneAndUpdate({ _id: userId }, { admin: true }, { new: true }).then(updatedUser => res.status(200).send({ msgType: 'success', msg: 'You successfully made the user admin', user: updatedUser })).catch(e => res.status(500).send({ msg: e }));
});

/** Delete user */
router.delete('/:userId', _tokenVerify.tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _User2.default.findOneAndDelete({ _id: userId }).then(deletedUser => res.status(200).send({ msgType: 'success', msg: 'You successfully removed the user', user: deletedUser })).catch(e => res.status(500).send({ msg: e }));
});

router.post('/search', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  const { query } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  if (query === '') {
    return _User2.default.find().select('-password').then(allUsers => res.status(200).send({ users: allUsers })).catch(e => res.status(500).send({ msg: e }));
  }

  return _User2.default.find().select('-password').then(usersFound => {
    const usersMatchingQuery = [];

    usersFound.map(item => {
      if (item.email.includes(query) || item.name.includes(query) || item.username.includes(query)) {
        return usersMatchingQuery.push(item);
      }
      return item;
    });
    return res.status(200).send({ users: usersMatchingQuery });
  }).catch(e => res.status(500).send({ msg: e }));
});

module.exports = router;