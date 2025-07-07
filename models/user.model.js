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
  resetToken: String, 
  tokenExpiry: Date,
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  googleId: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
