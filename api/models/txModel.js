const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var txSchema = new Schema({
  hash: {
    type: String,
    required: 'Hash de la tx requis'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  lock_time: {
    type: String,
    default: "Unknown"
  },
  size: {
    type: Number
  },
  relayed_by: {
    type: String
  },
  block_height: {
    type: String
  }
});

module.exports = mongoose.model('Transactions', txSchema);
