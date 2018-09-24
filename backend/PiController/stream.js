/* eslint-disable */
process.on('uncaughtException', (err) => {
  console.log(`Caught exception in stream: ${err}`);
  console.log(err.stack);
});

const express = require('express');
const raspividStream = require('raspivid-stream');
const path = require('path');

const app = express();
const wss = require('express-ws')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.ws('/video-stream', (ws, req) => {
  console.log('Client connected to stream');


  ws.send(JSON.stringify({
    action: 'init',
    width: '960',
    height: '540',
  }));

  const videoStream = raspividStream({
    rotation: 180,
    bitrate: 10000000,
  });

  videoStream.on('data', (data) => {
    ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
  });

  ws.on('close', () => {
    console.log('Client left');

    videoStream.removeAllListeners('data');
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();

  process.send({ streamUrl: url });
})();

app.listen(80, () => console.log('Server started on 80'));
