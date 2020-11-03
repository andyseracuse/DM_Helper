import React, { useState, useEffect } from 'react';


import { Jumbotron, Button, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import CreateCampaignFormModal from './CreateCampaignFormModal.jsx'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { get } from 'mongoose';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Dashboard = ({ 
  campaign, 
  campaignTitles,
  chooseCampaign, 
  getCampaignTitles,
  baseURL,
  setCampaign
}) => {

  const classes = useStyles();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createCampaignModal, setCreateCampaignModal] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const createCampaigntoggle = () => setCreateCampaignModal(!createCampaignModal);

  

  return (
    <div className="contianer">
      <CreateCampaignFormModal 
        createCampaignModal={createCampaignModal} 
        createCampaigntoggle={createCampaigntoggle} 
        getCampaignTitles={getCampaignTitles} 
        baseURL={baseURL}
        setCampaign={setCampaign}
        setCreateCampaignModal={setCreateCampaignModal}
      />
      <Jumbotron>
        <div className="contianer">
        <Row>
          <Col sm="9">
            <h1 className="display-4">Campaign: { campaign.title}</h1>
          </Col>
          <Col sm="3">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                <Avatar alt="your account" className={classes.large} src="https://i.pinimg.com/564x/57/38/bf/5738bf89d5dbcc84189f0475826cd023.jpg" />
                Campaigns
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Campaigns</DropdownItem>
                {
                  campaignTitles.map((titleObject, index) => {
                    return <DropdownItem onClick={() => {chooseCampaign(titleObject)}}key={titleObject.title}>{titleObject.title}</DropdownItem>
                  })
                }
                <DropdownItem divider />
                <DropdownItem onClick={() => createCampaigntoggle()}>Create Campaign</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        </div>
      </Jumbotron>
    </div>
  );
};

export default Dashboard