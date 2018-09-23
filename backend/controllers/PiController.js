import express from 'express';
import bodyParser from 'body-parser';
import Robot from '../models/Robot';


const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Robot Login */
router.post('/', (req, res) => {
  const { username } = req.body;
  console.log(username);

  Robot.findOne({ name: username })
    .then(robot => res.status(200).send({ robot }))
    .catch(e => res.status(500).send({ msg: e }));
});

router.post('/logout', (req, res) => {
  const { id } = req.body;

  console.log(':::::PI LOGOUT::::::');
  Robot.findOneAndUpdate({ _id: id },
    {
      isOnline: false,
      isAvailable: false,
    },
    { new: true })
    .then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'Successfully logged out', robot: updatedRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});

/** Update db from robot */
router.put('/', (req, res) => {
  const newRobotData = req.body;

  console.log(newRobotData);
  Robot.findOneAndUpdate({ _id: newRobotData.id },
    newRobotData,
    { new: true })
    .then(updatedRobot => res.status(200).send({ msgType: 'success', msg: 'Successfully updated', robot: updatedRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});

module.exports = router;
