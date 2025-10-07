const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');


const scrapRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  notes: { type: String, trim: true },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // 👈 NEW
});

module.exports = model('scraprequest', scrapRequestSchema);
