import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './db/config/config';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import RobotController from './controllers/RobotController';
import PiController from './controllers/PiController';
//test
const app = express();
const server = http.Server(app);
const io = socketIO(server);

/* Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* DB */
mongoose.Promise = global.Promise;
mongoose.connect(
  DATABASE_CONNECTION,
  { useNewUrlParser: true },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(':::Connected to DB:::'));

/* Endpoints */
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ res: 'Nodebot Backend says hello!' }));
});

app.use('/auth', AuthController);
app.use('/users', UserController);
app.use('/robots', RobotController);
app.use('/pi', PiController);


/* Socket */

let ns;

io.on('connection', (socket) => {
  socket.on('room', (room) => {
    ns = room;
    socket.join(room);
    io.sockets.in(ns).emit('message', 'what is going on, party people?');
  });

  socket.on('start-stream', () => {
    console.log('start-stream');
    io.sockets.in(ns).emit('start-stream');
  });
  
  socket.on('stop-stream', () => {
    console.log('stop-stream');
    io.sockets.in(ns).emit('stop-stream');
  });

  socket.on('command', (cmd) => {
    console.log(`:::Emitting ${cmd}:::`);
    io.sockets.in(ns).emit('command', cmd);
  });
  socket.on('robotMessage', (msg) => {
    console.log(`::::Recieved from robot ${msg}::::`);
  });
  socket.on('disconnect', () => {
    console.log(`::::User left ${socket.id}::::`);
  });

  socket.on('data', (data) => {
    io.sockets.in(ns).emit('stream', data);
  });

  socket.on('init', (data) => {
    socket.broadcast.emit('init', data);
  });
});


/* Init */
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;
