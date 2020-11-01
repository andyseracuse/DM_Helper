const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  NPCs: {
    groups:[
      {
        name: String,
        persuasion: {
          type: String,
          enum: ['with', 'against', 'nuetral']
        },
        members: [
          {
            name: {
              type: String,
              required: true
            },
            voice: String
          }
        ]
      }
    ]
  }
})

module.exports = mongoose.model('Campaign', campaignSchema)