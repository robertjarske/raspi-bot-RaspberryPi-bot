import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import Robot from '../models/Robot';
import { tokenVerify } from '../utils/tokenVerify';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Get all robots as admin */
router.get('/', tokenVerify, (req, res) => {
  const { user } = req;
  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return Robot.find()
    .then(robots => res.status(200).send({ robots }))
    .catch(e => res.status(500).send({ msg: e }));
});

// /** Get all robots */
// router.get('/', (req, res) => Robot.find()
//   .then(robots => res.status(200).send({ robots }))
//   .catch(e => res.status(500).send({ msg: e })));


/** Get robot by id as admin */
router.get('/:robotId', tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;
  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return Robot.findOne({ _id: robotId })
    .then(robotFound => res.status(200).send({ robot: robotFound }))
    .catch(e => res.status(500).send({ msg: e }));
});

// /** Get robot by id */
// router.get('/:robotId', (req, res) => {
//   const { robotId } = req.params;

//   return Robot.findOne({ _id: robotId })
//     .then(robotFound => res.status(200).send({ robot: robotFound }))
//     .catch(e => res.status(500).send({ msg: e }));
// });

/** Register new robot */
router.post('/', tokenVerify, (req, res) => {
  const { user } = req;
  const { name, ip } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return Robot.create({ name, ip })
    .then(newRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully added a new robot', robot: newRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Update robot */
router.put('/:robotId', tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;
  const newRobotdata = req.body;


  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return Robot.findOneAndUpdate({ _id: robotId },
    newRobotdata,
    { new: true })
    .then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully updated the robot', robot: updatedRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Delete robot */
router.delete('/:robotId', tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;


  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return Robot.findOneAndDelete({ _id: robotId })
    .then(deletedRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully removed the robot', robot: deletedRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Driving */
router.post('/test', (req, res) => {
  const { cmd } = req.body;
  console.log(cmd);
  return fetch(`http://10.126.5.78:8000/${cmd}`, { method: 'POST', body: cmd }).then((response) => {
    console.log(response);
  }).catch(e => console.error(e));
});

module.exports = router;
