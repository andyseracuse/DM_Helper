import React, { useState } from 'react';
import { Button } from 'reactstrap'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DefualtGroupsPane from './DefualtGroupsPane';
import axios from 'axios';
import CreateGroupFormModal from './CreateGroupFormModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function GroupsView({ campaign, chooseCampaign, baseURL}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [groupModalActivated, setGroupModalActivated] = useState(false)
  const groupModalToggle = () => setGroupModalActivated(!groupModalActivated);

  const submitNewGroup = (body) => {
    axios({
      method:"post",
      url: baseURL + "/campaign/" + campaign.id +"/NPCs/groups",
      data: body
    })
      .then(() => {
        chooseCampaign(campaign)
      })
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CreateGroupFormModal
        groupModalActivated={groupModalActivated} 
        groupModalToggle={groupModalToggle} 
        baseURL={baseURL}
        chooseCampaign={chooseCampaign}
        setGroupModalActivated={setGroupModalActivated}
        campaign={campaign}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab id="ajs-title-tab" label='GROUPS' {...a11yProps(0)} />
        {
          campaign.NPCs.groups.map((group, index) => {
            return <Tab label={group.name} {...a11yProps(index + 1)} />
          })
        }
      </Tabs>
      <TabPanel value={value} index={0}>
        <DefualtGroupsPane groupModalToggle={groupModalToggle} submitNewGroup={submitNewGroup}/>
      </TabPanel>
      {
        campaign.NPCs.groups.map((group, index) => {
          return (
            <TabPanel value={value} index={index + 1}>
              {group.name}
            </TabPanel>
          )
        })
      }
    </div>
  );
}
