const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Only required if NOT a Google user
    }
  },
  googleId: {
    type: String,
    sparse: true // Allows multiple null values
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return !this.googleId; // Required if not Google user
    }
  },
  isVerified: {
    type: Boolean,
    default: true // Users in this collection are already verified
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
