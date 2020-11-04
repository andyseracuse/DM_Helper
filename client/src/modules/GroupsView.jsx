import React, { useState } from 'react';
import { 
  Grid, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Typography,
  Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import GroupSelector from './GroupSelector';
import GroupPane from './GroupPane'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  center: {
    justifyContent: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordion: {
    backgroundColor: '#007bff'
  }
}));

export default function GroupsView({ campaign, baseURL, chooseCampaign }) {
  const classes = useStyles();

  const [selectedGroup, setSelectedGroup] = useState({members:[], default:true});
  const [selectedMember, setSelectedMember] = useState({default: true})

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.root}>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>NPC Viewer</Typography>
                <Typography className={classes.secondaryHeading}>Click for more info about the NPC Viewer</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  This is the NPC Groups Viewier.  You can select groups on the left and the groups info will appear in the group pane on the right.  The selector at the top of the group pane contains all members of the group.  To view detailed info. Select a member and their info will be rendered below.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
        <Grid item xs={3}>
          <GroupSelector 
            campaign={campaign} 
            selectedGroup={selectedGroup} 
            setSelectedGroup={setSelectedGroup}
            chooseCampaign={chooseCampaign}
            baseURL={baseURL}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
        </Grid>
        <Grid item xs={1}>
          <Divider className={classes.center} orientation="vertical"/>
        </Grid>
        <Grid item xs={8}>
          <GroupPane 
            selectedGroup={selectedGroup} 
            campaign={campaign} 
            baseURL={baseURL}
            setSelectedGroup={setSelectedGroup}
            chooseCampaign={chooseCampaign}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
