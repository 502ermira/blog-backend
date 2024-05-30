const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  email: String,
  name: String,
  givenName: String,
  familyName: String,
  picture: String,
  hd: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
