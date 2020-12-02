const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../db/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////
//User routes
////////////////////////////////////////////////////////////////


app.post('/users', function(req, res) {
  console.log('made it to userss')
  db.createUser(req.body)
    .then((dbResponse) =>  {
      res.status(200);
      res.send(dbResponse)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})

app.get('/users/:uid/campaigns', function (req, res) {
  db.findAllCampaigns(req.params.uid)
    .then((dbResponse) => {
      res.send(dbResponse)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});
////////////////////////////////////////////////////////////////
//Campaign routes
////////////////////////////////////////////////////////////////

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
app.put('/campaigns/:campaignId', function(req, res){
  db.updateCampaign(req.params.campaignId, req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})

app.post('/users/:uid/campaigns', function(req, res) {
  console.log('hello')
  db.createCampaign(req.params.uid, req.body)
    .then((dbResponse) =>  {
      res.status(200);
      res.send(dbResponse)
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
  db.createGroup(req.params.id, req.body)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})
app.get('/groups/:groupId', function(req, res) {
  db.getGroup(req.params.groupId)
    .then((dbResponse) => {
      console.log(dbResponse)
      res.status(200);
      res.send(dbResponse)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})
app.put('/groups/:groupId', function(req, res) {
  db.updateGroup(req.params.groupId, req.body)
    .then(() => {
      res.send(201)
    })
    .catch((err) => {
      res.send(500)
    })
})
app.delete('/groups/:groupId', function(req, res) {
  db.deleteGroup(req.params.groupId)
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
  db.createMember(req.body, req.params.groupId)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})
app.get('/members/:memberId', function(req, res){
  db.getMember(req.params.memberId)
    .then((response) => {
      res.status(200)
      res.send(response)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})
app.put('/members/:memberId', function(req, res){
  db.updateMember(req.params.memberId, req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})
app.delete('/members/:memberId', function(req, res) {
  db.deleteMember(req.params.memberId)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})

////////////////////////////////////////////////////////////////
//// CATCH ALL///
////////////////////////////////////////////////////////////////
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});