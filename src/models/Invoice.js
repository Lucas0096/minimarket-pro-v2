const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  marketId: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
  amount: { type: Number, required: true },
  issueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);