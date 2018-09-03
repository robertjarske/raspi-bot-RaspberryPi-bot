const spawn = require('child_process').spawn;
const keypress = require('keypress');

let command;


// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

function sendCommand(com) {
  if (com === 'up') {
    console.log('here');
    command = spawn('python', ['./test.py', 'forward']);
  }
  if (com === 'down') {
    command = spawn('python', ['./test.py', 'backward']);
  }
  if (com === 'left') {
    command = spawn('python', ['./test.py', 'left']);
  }
  if (com === 'right') {
    command = spawn('python', ['./test.py', 'right']);
  }
  if (com === 'q') {
    command = spawn('python', ['./test.py', 'stop']);
  }

  command.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}

// listen for the "keypress" event
process.stdin.on('keypress', (ch, key) => {
  console.log(key.name);
  sendCommand(key.name);
  if (key && key.ctrl && key.name === 'q') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
