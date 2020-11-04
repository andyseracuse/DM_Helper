import React, {useState} from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MemberSelector from './MemberSelector'
import InfoPane from './InfoPane'

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
        <InfoPane selectedMember={selectedMember} selectedGroup={selectedGroup}/>
      </Paper>
    </div>
  )
}
