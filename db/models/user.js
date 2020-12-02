const mongoose = require('mongoose');
const Campaign = require('./campaign.js')
const { Schema } = mongoose;

const userSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    default: 'https://i.pinimg.com/564x/57/38/bf/5738bf89d5dbcc84189f0475826cd023.jpg'
  },
  campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }]
})


module.exports = mongoose.model('User', userSchema)