const mongoose = require('mongoose');
const Group = require('./group.js')
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  image: {
    type: String,
    default: () => {
      const defaultCampaignImages = [
        'https://media.dnd.wizards.com/styles/second_hubpage_banner/public/images/head-banner/NEW-TO-DnD_What-is-DnD_Subsection_Hero_140718.jpg', 
        'https://process.filepicker.io/APHE465sSbqvbOIStdwTyz/rotate=deg:exif/resize=fit:crop,height:566,width:944/output=quality:80,compress:true,strip:true,format:jpg/cache=expiry:max/https://cdn.filestackcontent.com/RNZA9HcSZq6LjfXa1Vxf', 
        'https://world.edu/wp-content/uploads/2019/10/dungeons.jpg', 
        'https://cdn.arstechnica.net/wp-content/uploads/2016/02/DDmonstermanual_th_0-640x361.jpg', 
        'https://cache.desktopnexus.com/thumbseg/2500/2500201-bigthumbnail.jpg'
      ]
      return defaultCampaignImages[Math.floor(Math.random() * (defaultCampaignImages.length))];
    }
  },
  NPCs: {
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
  }
})


module.exports = mongoose.model('Campaign', campaignSchema)