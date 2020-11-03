const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: String,
  persuasion: {
    type: String,
    enum: ['with', 'against', 'nuetral']
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'Members' }]
})

module.exports = mongoose.model('Group', groupSchema)