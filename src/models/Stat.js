const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatSchema = new Schema({
  type: { type: String, enum: ['sales', 'users', 'subscriptions'], required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stat', StatSchema);