/////FUTURE ALTERATION. USE REFS GOD DAMMIT


const mongoose = require('mongoose');
const Campaign = require('./models/campaign.js')
mongoose.connect('mongodb://localhost:27017/DM_Helper',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


/////////////////////////////////////////////////////////////////
//CAMPAIGN FXNS
/////////////////////////////////////////////////////////////////

const findAllCampaigns = function() {
  return Campaign.find({}, {title: 1})
};

const findOneCampaign = function(id) {
  return Campaign.findById(id)
}

const createCampaign = function(title) {
  return Campaign.create({
    title: title,
    NPCs: {
      groups: []
    }
  })
}

const deleteCampaign = function(id) {
  return Campaign.findByIdAndRemove(id)
}

////////////////////////////////////////////////////////////
//GROUP FXNS
////////////////////////////////////////////////////////////

const createGroup = function(id, body) {
  return Campaign.findById(id)
    .exec()
    .then((campaign) => {
      campaign.NPCs.groups.push({
        name: body.name,
        persuasion: body.persuasion
      })
      console.log(campaign.text)
      campaign.markModified('NPCs')
      campaign.save()
    })
    .catch(err => console.log(err))
}

// const UpdateGroup = function(groupId) {
//   return Campaign.findOneAndUpdate({'NPCs.groups._id': groupId})
//     .exec()
//     .then((group) =>)
// }

const deleteGroup = function(campaignId, groupId) {
  console.log('campaign ID', campaignId)
  console.log('group ID', groupId)
  return Campaign.findById(campaignId)
    .exec()
    .then((campaign) => {
      campaign.NPCs.groups.pull({_id: groupId})
      campaign.save()
    })
}

//////////////////////////////////////////////////////////
//MEMBER FXNS
///////////////////////////////////////////////////////////
const createMember = function(campaignId, groupId, body) {
  console.log(campaignId)
  return Campaign.findOne({ '_id': campaignId })
    .exec()
    .then((campaign) => {
      for(let i = 0; i < campaign.NPCs.groups.length; i++) {
        if (JSON.stringify(campaign.NPCs.groups[i]._id) === JSON.stringify(groupId)) {
          campaign.NPCs.groups[i].members.push(body)
          break
        }
      }
      campaign.markModified('NPCs')
      campaign.save()
    })
    .then((response) => {console.log(response)})
}

const deleteMember = function(campaignId, groupId, memberId) {
  return Campaign.findOne({ '_id': campaignId })
    .exec()
    .then((campaign) => {
      console.log('the fuck')
      for(let i = 0; i < campaign.NPCs.groups.length; i++) {
        console.log(campaign.NPCs.groups[i])
        if (JSON.stringify(campaign.NPCs.groups[i]._id) === JSON.stringify(groupId)) {
          console.log(memberId)
          campaign.NPCs.groups[i].members.pull({_id: memberId})
          break
        }
      }
      campaign.markModified('NPCs')
      campaign.save()
    })
}

module.exports = {
  findAllCampaigns: findAllCampaigns,
  findOneCampaign: findOneCampaign,
  createCampaign: createCampaign,
  deleteCampaign: deleteCampaign,
  createGroup: createGroup,
  deleteGroup: deleteGroup,
  createMember: createMember,
  deleteMember: deleteMember
};