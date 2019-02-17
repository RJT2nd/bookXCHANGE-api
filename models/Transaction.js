var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  book_id: mongoose.Types.ObjectId,
  seller_id: mongoose.Types.ObjectId,
  buyer_id: mongoose.Types.ObjectId
});