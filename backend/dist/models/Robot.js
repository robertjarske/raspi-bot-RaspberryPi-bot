'use strict';

/* eslint no-underscore-dangle: ["error", { "allow": ["_update"] }] */
const mongoose = require('mongoose');

const robotSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String },
  streamUrl: { type: String },
  isOnline: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: false }
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;