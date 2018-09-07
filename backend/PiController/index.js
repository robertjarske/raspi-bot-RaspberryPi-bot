const express = require('express');
const raspividStream = require('raspivid-stream');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const app = express();
const server = http.Server(app);
const socketIO = require('socket.io-client');

const io = socketIO('http://10.126.4.167:8000/123'); // THIS IS DEV LOCAL AND NAMESPACE 123
// const wss = require('express-ws')(app, server);

/** Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Python shell to run python script from node */
const { PythonShell } = require('python-shell');

const options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'], // get print results in real-time
};
const pyshell = new PythonShell('./motorDriver.py', options);

pyshell.on('message', (message) => {
  io.emit('robotMessage', message);
});

function sendCommand(cmd) {
  pyshell.send(cmd);
}

io.on('connect', () => {
  console.log('connected');
  io.on('command', (cmd) => {
    console.log('the command triggered', cmd);
    sendCommand(cmd);
  });

  io.on('start-stream', () => {
    console.log('start stream requested');

    const videoStream = raspividStream({
      width: 960,
      height: 540,
      rotation: 180,
      bitrate: 10000000,
      sharpness: 0,
    });

    videoStream.on('data', (data) => {
      io.emit('data', data);
    });

    io.on('disconnect', () => {
      console.log('Client left');

      videoStream.removeAllListeners('data');
    });
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;
