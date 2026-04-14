const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  fabricCollection: { type: String, required: true },
  specificColor: { type: String },
  quantity: { type: String, required: true },
  projectDetails: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
