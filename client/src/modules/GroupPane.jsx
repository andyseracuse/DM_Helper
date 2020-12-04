import React, {useState} from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MemberSelector from './MemberSelector'
import InfoPane from './InfoPane';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  groupPane: {
    width: "100%",
    height: 500,
    background: '#343a402b'
  }
}));


export default function GroupPane({ 
  campaign, 
  baseURL, 
  setSelectedGroup,
  chooseCampaign,
  selectedGroup,
  selectedMember,
  setSelectedMember  
}) {
  const classes = useStyles();

  const getGroup = () => {
    axios({
      method: 'get',
      url: baseURL + '/groups/' + selectedGroup._id,
    })
      .then((response) => {
        setSelectedGroup(response.data)
      })
  }
  

  return (
    <div>
      <Paper className={classes.groupPane}>
        <MemberSelector 
          campaign={campaign} 
          selectedGroup={selectedGroup}
          baseURL={baseURL}
          setSelectedGroup={setSelectedGroup}
          chooseCampaign={chooseCampaign}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
        <InfoPane setSelectedMember={setSelectedMember} getGroup={getGroup} baseURL={baseURL} selectedMember={selectedMember} selectedGroup={selectedGroup}/>
      </Paper>
    </div>
  )
}
