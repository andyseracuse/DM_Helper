const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
  voice: String,
  notes: String,
  photo: String,
  charachterSheetUrl: String,
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Member', memberSchema)