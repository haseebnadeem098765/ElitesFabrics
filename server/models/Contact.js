const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fabricInterest: { type: String },
  requirements: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
