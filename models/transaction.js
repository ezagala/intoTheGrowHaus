const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transID: {type: String, required: true},
  date: { type: Date, required: true}, 
  customer: {type: String, required: true}, 
  description: {type: Map, of: String}, 
  tenderType: {type: String}, 
  taxTotal: {type: Number}, 
  transTotal: {type: Number}
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;