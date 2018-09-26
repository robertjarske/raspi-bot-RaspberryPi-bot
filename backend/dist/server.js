'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./db/config/config');

var _AuthController = require('./controllers/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

var _UserController = require('./controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _RobotController = require('./controllers/RobotController');

var _RobotController2 = _interopRequireDefault(_RobotController);

var _PiController = require('./controllers/PiController');

var _PiController2 = _interopRequireDefault(_PiController);

var _Robot = require('./models/Robot');

var _Robot2 = _interopRequireDefault(_Robot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const server = _http2.default.Server(app);
const io = (0, _socket2.default)(server);

/* Middleware */
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

/* DB */
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config.DATABASE_CONNECTION, { useNewUrlParser: true });

const db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(':::Connected to DB:::'));

/* Endpoints */
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ res: 'Nodebot Backend says hello!' }));
});

app.use('/auth', _AuthController2.default);
app.use('/users', _UserController2.default);
app.use('/robots', _RobotController2.default);
app.use('/pi', _PiController2.default);

/* Socket */

let ns;
let driver;
let robotId;

io.on('connection', socket => {
  socket.on('room', room => {
    console.log('::::::ROOOM::::::', room);
    ns = room;
    socket.join(room);
    io.sockets.in(ns).emit('message', `You joined room ${ns}`);
  });

  socket.on('start-stream', id => {
    console.log('::::::START STREAM:::::', id);
    driver = socket.id;
    robotId = id;
    console.log(':::::DRIVER IN START STREAM:::::', driver);
    io.sockets.in(ns).emit('start-stream');
  });

  socket.on('stop-stream', () => {
    console.log('stop-stream');
    io.sockets.in(ns).emit('stop-stream');
  });

  socket.on('command', cmd => {
    console.log(`:::Emitting ${cmd}:::`);
    io.sockets.in(ns).emit('command', cmd);
  });
  socket.on('robotMessage', msg => {
    console.log(`::::Recieved from robot ${msg}::::`);
  });
  socket.on('disconnect', () => {
    console.log(':::::DRIVER IN DISCONNECT:::::', driver);
    if (socket.id === driver) {
      console.log('::::DRIVER DISCONNECTED:::');
      return _Robot2.default.findOneAndUpdate({ _id: robotId }, { isAvailable: true }, { new: true }).then(updatedRobot => console.log('HERE', updatedRobot)).catch(err => console.error(err));
    }
    console.log(`::::User left ${socket.id}::::`);
    return true;
  });

  socket.on('data', data => {
    io.sockets.in(ns).emit('stream', data);
  });

  socket.on('init', data => {
    socket.broadcast.emit('init', data);
  });
});

/* Init */
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;