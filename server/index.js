const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../database-mongo/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


////////////////////////////////////////////////////////////////
//Campaign routes
////////////////////////////////////////////////////////////////
app.get('/campaigns', function (req, res) {
  db.findAllCampaigns()
    .then((dbResponse) => {
      res.send(dbResponse)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.get('/campaigns/:id', function(req, res) {
  db.findOneCampaign(req.params.id)
    .then((dbResponse) => {
      res.send(dbResponse)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})

app.delete('/campaigns/:id', function(req, res) {
  db.deleteCampaign(req.params.id)
    .then(() =>  res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus('500')
    })
})

app.post('/campaigns/', function(req, res) {
  db.createCampaign(req.body.title)
    .then((dbResponse) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})

//////////////////////////////////////////////////////////////
//NPC GROUP ROUTES
///////////////////////////////////////////////////////////////
app.post('/campaigns/:id/NPCs/groups', function(req, res) {
  console.log('in post group')
  db.createGroup(req.params.id, req.body)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})
app.delete('/campaigns/:campaignId/NPCs/groups/:groupId', function(req, res) {
  db.deleteGroup(req.params.campaignId, req.params.groupId)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})
////////////////////////////////////////////////////////////
//MEMBER ROUTES
/////////////////////////////////////////////////////////////
app.post('/campaigns/:campaignId/NPCs/groups/:groupId/members', function(req, res) {
  db.createMember(req.params.campaignId, req.params.groupId, req.body)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})

app.delete('/campaigns/:campaignId/NPCs/groups/:groupId/members/:memberId', function(req, res) {
  db.deleteMember(req.params.campaignId, req.params.groupId, req.params.memberId)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

