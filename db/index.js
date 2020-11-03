const mongoose = require('mongoose');
const Campaign = require('./models/campaign.js');
const Member = require('./models/member.js')
const Group = require('./models/group.js');

mongoose.connect('mongodb://localhost:27017/DM_Helper',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection

/////////////////////////////////////////////////////////////////
//CAMPAIGN FXNS
/////////////////////////////////////////////////////////////////

const findAllCampaigns = function() {
  return Campaign.find({}, { title: 1, image: 1 })
}

const findOneCampaign = function(id) {
  return Campaign.findById(id)
}

const createCampaign = function(body) {
  return Campaign.create({
    ...body,
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

const createGroup = async function(campaignId, body) {
  const campaign = await Campaign.findById(campaignId);
  const group = await Group.create(body);
  await campaign.NPCs.groups.push(group);
  await campaign.save();
  return group;
}

const getGroup = async function(groupId) {
  const group = await Group.findById(groupId);
  return group;
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

const updateMember = async function(memberId, body){
  return await Member.findByIdAndUpdate(memberId, body);
}

const deleteMember = async function(memberId){
  return await Member.findByIdAndDelete(memberId)
}

module.exports = {
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
  deleteMember: deleteMember
};
