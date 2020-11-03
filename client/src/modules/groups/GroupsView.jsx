import React, { useState } from 'react';
import { Button, Container } from 'reactstrap'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Grid } from '@material-ui/core';
import DefaultGroupsPane from './DefaultGroupsPane';
import axios from 'axios';
import CreateGroupFormModal from './CreateGroupFormModal';
import GroupPane from './GroupPane';


import { Row, Col, Navbar } from 'reactstrap';

export default function GroupsView({ campaign, chooseCampaign, baseURL }) {

  const [selectedGroup, setSelectedGroup] = useState('groups')
  const [groupModalActivated, setGroupModalActivated] = useState(false)
  const groupModalToggle = () => setGroupModalActivated(!groupModalActivated);
  console.log('groupsveiwcampaign', campaign)
  return (
    <Container>
      <Row>
        <CreateGroupFormModal
          groupModalActivated={groupModalActivated} 
          groupModalToggle={groupModalToggle} 
          baseURL={baseURL}
          chooseCampaign={chooseCampaign}
          setGroupModalActivated={setGroupModalActivated}
          campaign={campaign}
        />
        <Col sm={4} md={3}>
          <div className="ajs-group-selector ajs-column-flex">
            <Button disabled className="w-100" color="secondary">Groups</Button>
            <Button onClick={groupModalToggle} className="w-100" color="info">Create +</Button>
            <div className="ajs-group-buttons">
              {
                campaign.NPCs.groups.map((group, index) => {
                  return (
                    <Button 
                      className="w-100"
                      color="primary"
                      outline = {group._id === selectedGroup._id ? false : true}
                      onClick={() => setSelectedGroup(group)}
                    >
                      {group.name}
                    </Button>
                  )
                })
              }
            </div>
          </div>
        </Col>
        <Col sm={8} md={9}>
          {selectedGroup === 'groups' ? <DefaultGroupsPane /> : <GroupPane group={selectedGroup} campaign={campaign} setSelectedGroup={setSelectedGroup} baseURL={baseURL} chooseCampaign={chooseCampaign} />}
        </Col>
      </Row>
    </Container>
  )
}



