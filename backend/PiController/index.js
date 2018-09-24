const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { fork } = require('child_process');


require('dotenv').config();

const app = express();
const server = http.Server(app);
const socketIO = require('socket.io-client');

const io = socketIO(`${process.env.DEV_API_URL}`); // THIS IS DEV LOCAL AND NAMESPACE 123

const port = process.env.PORT || 8000;

const id = '5b8cf3873b05fb0961de4487';

/** Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const ngrok = require('ngrok');

(async function ngrokTunnel() {
  const url = await ngrok.connect(port);

  console.log('Pi is up over @: ', url);
  fetch(`${process.env.DEV_API_URL}/pi/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, url, streamUrl: '' }),
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(e => console.error(e));
}());

const onExit = () => {
  console.log('in exiting state...');
  fetch(`${process.env.DEV_API_URL}/pi/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(e => console.error(e));
};


// tunnel.on('close', () => {
//
// });

/** Python shell to run python script from node */
const { PythonShell } = require('python-shell');
require('./cleanup').Cleanup(onExit);

const options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'], // get print results in real-time
};
const pyshell = new PythonShell('motorDriver.py', options);

pyshell.on('message', (message) => {
  io.emit('robotMessage', message);
});

function sendCommand(cmd) {
  pyshell.send(cmd);
}

io.on('connect', () => {
  if (id) io.emit('room', id); // Join the socket room
  console.log('connected');
});

io.on('command', (cmd) => {
  console.log('the command triggered', cmd);
  sendCommand(cmd);
});

io.on('start-stream', () => {
  const forked = fork('stream.js');

  forked.on('message', (msg) => {
    console.log('message', msg);
    fetch(`${process.env.DEV_API_URL}/pi/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, streamUrl: msg.streamUrl }),
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(e => console.error(e));
  });
});

app.get('/alive', (req, res) => res.status(200).send(JSON.stringify({ res: 'Pi says hello!' })));

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ res: 'Pi says hello!' }));
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});


server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;
