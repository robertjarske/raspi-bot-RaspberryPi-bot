'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Robot = require('../models/Robot');

var _Robot2 = _interopRequireDefault(_Robot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.use(_bodyParser2.default.urlencoded({ extended: false }));
router.use(_bodyParser2.default.json());

/** Robot Login */
router.post('/', (req, res) => {
  const { username } = req.body;
  console.log(username);

  _Robot2.default.findOne({ name: username }).then(robot => res.status(200).send({ robot })).catch(e => res.status(500).send({ msg: e }));
});

router.post('/logout', (req, res) => {
  const { id } = req.body;

  console.log(':::::PI LOGOUT::::::');
  _Robot2.default.findOneAndUpdate({ _id: id }, {
    isOnline: false,
    isAvailable: false
  }, { new: true }).then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'Successfully logged out', robot: updatedRobot })).catch(e => res.status(500).send({ msg: e }));
});

/** Update db from robot */
router.put('/', (req, res) => {
  const newRobotData = req.body;

  _Robot2.default.findOneAndUpdate({ _id: newRobotData.id }, newRobotData, { new: true }).then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'Successfully updated', robot: updatedRobot })).catch(e => res.status(500).send({ msg: e }));
});

module.exports = router;