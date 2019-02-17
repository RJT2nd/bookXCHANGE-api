var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  condition: {
    type: String
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  primary_image_location: {
    type: String
  },
  secondary_image_locations: [],
  upload_date: {
    type: Date,
    default: Date.now
  },
  user_id: mongoose.Types.ObjectId,
  publisher: String,
  published_year: Number,
  description: String,
  sold: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', BookSchema);