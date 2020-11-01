const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    Voice: String
  })

module.exports = mongoose.model('Member', memberSchema)