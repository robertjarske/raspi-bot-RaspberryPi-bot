import express from 'express';
import bodyParser from 'body-parser';
import Robot from '../models/Robot';
import { tokenVerify } from '../utils/tokenVerify';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', tokenVerify, (req, res) => {
  const { user } = req;
  const { name, ip } = req.body;

  if (!user.admin) return res.status(404).send({ msgType: 'danger', msg: 'You are not allowed to do that' });
  return Robot.create(
    {
      name,
      ip,
    },
  )
    .then(newRobot => res.status(200).send({ msgType: 'success', msg: 'You successfully added a new robot', robot: newRobot }))
    .catch(e => res.status(500).send({ msg: e }));
});


module.exports = router;
