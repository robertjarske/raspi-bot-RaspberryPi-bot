# u14-fullstackjs-idea

Fullstack school project, the idea is to build a nodebot using a Raspberry Pi, hooking it up with a camera for live video.

## PI
This folder is on the Raspberry Pi, uses Socket.io for communication with the server, it spawns a python scritpt for motor control and another node script for streaming from the pi-cam over websockets and has an endpoint for checking if it is online/alive.
The Pi uses ngrok to be reachable over the interwebz
