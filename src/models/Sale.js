const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  marketId: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  saleDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', SaleSchema);