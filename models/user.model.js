const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  roles: {
    type: [String],
    enum: ['user', 'admin', 'seller', 'moderator'],
    default: ['user'],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
