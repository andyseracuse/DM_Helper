const mongoose = require('mongoose');
const { Schema } = mongoose;
const Member = require('./member.js')

const groupSchema = new Schema ({
  name: String,
  persuasion: {
    type: String,
    enum: ['with', 'against', 'nuetral']
  },
  members: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

module.exports = mongoose.model('Group', groupSchema)