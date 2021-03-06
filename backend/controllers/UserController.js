import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/User';
import { tokenVerify } from '../utils/tokenVerify';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Get all users */
router.get('/', tokenVerify, (req, res) => {
  const { user } = req;
  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return User.find()
    .select('-password')
    .then(users => res.status(200).send({ users }))
    .catch(e => res.status(500).send({ msg: e }));
});


/** Get user by id */
router.get('/:userId', tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return User.findOne({ _id: userId })
    .select('-password')
    .then(userFound => res.status(200).send({ user: userFound }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Register a user */
router.post('/', tokenVerify, (req, res) => {
  const { user } = req;
  const {
    email,
    name,
    username,
    password,
  } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return User.create(
    {
      name,
      username,
      email,
      password,
      avatar: `https://api.adorable.io/avatars/100/${name}@adorable.png`,
      thumbnail: `https://api.adorable.io/avatars/50/${name}@adorable.png`,
    },
  )
    .then(newUser => res.status(200).send({
      msgType: 'success',
      msg: 'You successfully registered a new user',
      user: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        thumbnail: newUser.thumbnail,
      },
    }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Update user */
router.put('/:userId', tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  const newUserdata = req.body;

  if (!user.admin && !user._id === userId) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return User.findOneAndUpdate({ _id: userId },
    newUserdata,
    { new: true })
    .then(updatedUser => res.status(200).send({ msgType: 'success', msg: 'Successfully updated', user: updatedUser }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Make user admin */
router.put('/:userId/permissions', tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;


  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return User.findOneAndUpdate({ _id: userId },
    { admin: true },
    { new: true })
    .then(updatedUser => res.status(200).send({ msgType: 'success', msg: 'You successfully made the user admin', user: updatedUser }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Delete user */
router.delete('/:userId', tokenVerify, (req, res) => {
  const { userId } = req.params;
  const { user } = req;


  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return User.findOneAndDelete({ _id: userId })
    .then(deletedUser => res.status(200).send({ msgType: 'success', msg: 'You successfully removed the user', user: deletedUser }))
    .catch(e => res.status(500).send({ msg: e }));
});

router.post('/search', tokenVerify, (req, res) => {
  const { user } = req;
  const { query } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  if (query === '') {
    return User.find().select('-password').then(allUsers => res.status(200).send({ users: allUsers }))
      .catch(e => res.status(500).send({ msg: e }));
  }

  return User.find()
    .select('-password')
    .then((usersFound) => {
      const usersMatchingQuery = [];

      usersFound.map((item) => {
        if (
          item.email.includes(query)
          || item.name.includes(query)
          || item.username.includes(query)
        ) { return usersMatchingQuery.push(item); }
        return item;
      });
      return res.status(200).send({ users: usersMatchingQuery });
    })
    .catch(e => res.status(500).send({ msg: e }));
});


module.exports = router;
