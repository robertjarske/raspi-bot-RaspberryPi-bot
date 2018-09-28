# u14-fullstackjs-idea 
## Deployed @ https://rjenodebot.herokuapp.com

Fullstack school project, the idea is to build a nodebot using a Raspberry Pi, hooking it up with a camera for live video.

## Stack

- Frontend - React, Socket.io
- Backend - Node, Express, Socket.io
- DB - MongoDb

## Hardware

- Raspberry Pi 3B +
- Raspberry Pi Rover (https://hos.se/produkt/raspberry-pi-rover/2774?categoryId=265)
- Raspberry Pi Camera (https://hos.se/produkt/raspberrypi-kamera/2006?categoryId=265)

### Reads

- https://github.com/nebrius/raspi-io/wiki/Getting-a-Raspberry-Pi-ready-for-NodeBots
- https://www.hackster.io/team-node-bot/the-node-bot-c0ad25
- http://nodebots.io/
- http://johnny-five.io/examples/raspi-io/
- https://porter.io/github.com/rwaldron/johnny-five
- https://www.hackster.io/IainIsCreative/setting-up-the-raspberry-pi-and-johnny-five-56d60f
- https://www.robotshop.com/forum/node-js-johnny-five-raspberry-pi-3-t15029
- https://pimylifeup.com/raspberry-pi-webcam-server/
- https://github.com/simonmonk/raspirobotboard3/blob/master/python/rrb3.py IMPORTANT!
- http://pagekite.net/
- https://localtunnel.github.io/www/

### Initial Camera Setup

`sudo apt-get install build-essential libjpeg8-dev imagemagick libv4l-dev cmake -y`

Camera is running MJPG Streamer Experimental (https://github.com/jacksonliam/mjpg-streamer)

## Initial Camera Running Options

`./mjpg_streamer -i "./input_raspicam.so -vf -fps 25 -x 1280 -y 960 -ex antishake" -o "./output_http.so -n -w ./www"`

More options can be found at: https://discourse.octoprint.org/t/available-mjpg-streamer-configuration-options/1106

### Start

From backend root folder run
`./start.sh`
