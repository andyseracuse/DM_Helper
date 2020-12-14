const mongoose = require('mongoose');
const User = require('./models/user.js');
const Campaign = require('./models/campaign.js');
const Member = require('./models/member.js')
const Group = require('./models/group.js');
const keys = require('../keys.js');

mongoose.connect(keys.db_connection_string,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection

/////////////////////////////////////////////////////////////////
//USER FXNS
/////////////////////////////////////////////////////////////////

const createUser = function(body) {
  return User.create({
    ...body,
    campaigns: []
  })
}

const findAllCampaigns = function(uid) {
  return User.findOne({uid: uid}, { title: 1, image: 1 })
    .populate({path: 'campaigns'})
    .then((user) => {
      console.log(user.campaigns)
      return user.campaigns
    })
}
/////////////////////////////////////////////////////////////////
//CAMPAIGN FXNS
/////////////////////////////////////////////////////////////////


const findOneCampaign = async function(id) {
  return Campaign.findById(id)
    .populate({path: 'NPCs.groups', populate:{ path: 'members'}})
    .then((campaign) => {return campaign})
}

const createCampaign = async function(uid, body) {
  const user = await User.findOne({uid: uid})
  const campaign = await Campaign.create({
    ...body,
    NPCs: {
      groups: []
    }
  })
  await user.campaigns.push(campaign);
  await user.save();
  return campaign
}

const updateCampaign= async function(campaignId, body){
  if(body.image === ''){
    body = {title: body.title}
  }
  return await Campaign.findByIdAndUpdate(campaignId, body);
}

const deleteCampaign = function(id) {
  return Campaign.findByIdAndRemove(id)
}

////////////////////////////////////////////////////////////
//GROUP FXNS
////////////////////////////////////////////////////////////

const createGroup = async function(campaignId, body) {
  const campaign = await Campaign.findById(campaignId);
  const group = await Group.create(body);
  await campaign.NPCs.groups.push(group);
  await campaign.save();
  return group;
}

const getGroup = async function(groupId) {
  return Group.findById(groupId)
    .populate({path: 'members'})
    .then((group) => {return group})
}

const updateGroup = async function(groupId, body) {
  return await Group.findByIdAndUpdate(groupId, body)
}

const deleteGroup = async function(groupId) {
  return await Group.findByIdAndDelete(groupId)
}

//////////////////////////////////////////////////////////
//MEMBER FXNS
///////////////////////////////////////////////////////////

const createMember = async function(body, groupId){
  const group = await Group.findById(groupId);
  const member = await Member.create(body)
  await group.members.push(member);
  await group.save();
  return member
}

const getMember = async function(memberId){
  const member = await Member.findById(memberId);
  return member
}

const updateMember = async function(memberId, body){
  return await Member.findByIdAndUpdate(memberId, body);
}

const deleteMember = async function(memberId){
  return await Member.findByIdAndDelete(memberId)
}

module.exports = {
  createUser: createUser,
  findAllCampaigns: findAllCampaigns,
  findOneCampaign: findOneCampaign,
  createCampaign: createCampaign,
  deleteCampaign: deleteCampaign,
  createGroup: createGroup,
  getGroup: getGroup,
  updateGroup: updateGroup,
  deleteGroup: deleteGroup,
  createMember: createMember,
  updateMember: updateMember,
  deleteMember: deleteMember,
  getMember: getMember,
  updateCampaign: updateCampaign
};
