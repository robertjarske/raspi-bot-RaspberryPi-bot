const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const socketIO = require('socket.io-client');

const io = socketIO('http://10.126.4.167:8000/123'); // THIS IS DEV LOCAL AND NAMESPACE 123

/* Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { PythonShell } = require('python-shell');

const options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'], // get print results in real-time
};
const pyshell = new PythonShell('./motorDriver.py', options);

pyshell.on('message', (message) => {
  console.log(message);
  io.emit('robotMessage', message);
});


function sendCommand(cmd) {
  pyshell.send(cmd);
}


io.on('connect', () => {
  io.on('command', (cmd) => {
    console.log('the command triggered', cmd);
    sendCommand(cmd);
  });
});


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = server;
