/* eslint no-underscore-dangle: ["error", { "allow": ["_update"] }] */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'You need to register an email'],
    trim: true,
    minlength: 1,
  },
  name: {
    type: String,
    required: [true, 'You need to register a name'],
    trim: true,
    minlength: 1,
  },
  username: {
    type: String,
    required: [true, 'You need to register a username'],
    trim: true,
    minlength: 1,
  },
  password: { type: String, required: [true, 'You need to register a password'], minlength: 1 },
  avatar: String,
  thumbnail: String,
  admin: { type: Boolean, default: false },
});

userSchema.pre('save', function callback(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error);

    user.password = hash;
    return next();
  });
});

userSchema.pre('findOneAndUpdate', function callback(next) {
  const user = this;

  const { password } = user._update;
  if (!password) return next();

  return bcrypt.hash(password, 10, (error, hash) => {
    if (error) return next(error);
    user._update.password = hash;
    return next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
