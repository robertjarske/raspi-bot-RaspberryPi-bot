const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
