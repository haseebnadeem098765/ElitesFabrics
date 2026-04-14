const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allows flexible JSON storage
    default: {},
  }
}, { timestamps: true });

// Ensure unique page-section combination
contentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
