const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
  action: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);