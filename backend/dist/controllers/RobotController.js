'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Robot = require('../models/Robot');

var _Robot2 = _interopRequireDefault(_Robot);

var _tokenVerify = require('../utils/tokenVerify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.use(_bodyParser2.default.urlencoded({ extended: false }));
router.use(_bodyParser2.default.json());

/** Get all robots */
router.get('/', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  if (!user) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return _Robot2.default.find().then(robots => res.status(200).send({ robots })).catch(e => res.status(500).send({ msg: e }));
});

/** Get robot by id as admin */
router.get('/:robotId', _tokenVerify.tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;
  if (!user) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _Robot2.default.findOne({ _id: robotId }).then(robotFound => res.status(200).send({ robot: robotFound })).catch(e => res.status(500).send({ msg: e }));
});

/** Register new robot */
router.post('/', _tokenVerify.tokenVerify, (req, res) => {
  const { user } = req;
  const { name, ip } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return _Robot2.default.create({ name, url: ip }).then(newRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully added a new robot', robot: newRobot })).catch(e => res.status(500).send({ msg: e }));
});

/** Update robot */
router.put('/:robotId', _tokenVerify.tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;
  const newRobotdata = req.body;

  if (!user) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _Robot2.default.findOneAndUpdate({ _id: robotId }, newRobotdata, { new: true }).then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully updated the robot', robot: updatedRobot })).catch(e => res.status(500).send({ msg: e }));
});

router.put('/:robotId/endsession', _tokenVerify.tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;
  const newRobotdata = req.body;

  if (!user) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _Robot2.default.findOneAndUpdate({ _id: robotId }, newRobotdata, { new: true }).then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully ended session', robot: updatedRobot })).catch(e => res.status(500).send({ msg: e }));
});

/** Delete robot */
router.delete('/:robotId', _tokenVerify.tokenVerify, (req, res) => {
  const { robotId } = req.params;
  const { user } = req;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });

  return _Robot2.default.findOneAndDelete({ _id: robotId }).then(deletedRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully removed the robot', robot: deletedRobot })).catch(e => res.status(500).send({ msg: e }));
});

module.exports = router;