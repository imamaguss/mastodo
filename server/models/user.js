const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  gender: String,
  phone: String,
  fbLogin: {
    type: Number,
    default: 0
  },
  googleLogin: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;