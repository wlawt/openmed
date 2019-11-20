const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  payment: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  asset_id: {
    type: String,
    required: true
  },
  p_public_key: {
    type: String
  },
  r_public_key: {
    type: String,
    required: true
  },
  fulfillment: {
    type: String,
    required: true
  }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
