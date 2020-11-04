import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import campaign from '../../../../../../database-mongo/models/campaign';
import FormModal from './FormModal';
import InputForm from './InputForm';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%"
  },
  groupButton: {
    width: '100%',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #3f51b5'
    }
  }
}));

export default function GroupSelector({ 
  campaign, 
  chooseCampaign, 
  selectedGroup, 
  setSelectedGroup,
  baseURL
}) {
  const classes = useStyles();

  const [createGroupModal, setCreateGroupModal] = useState(false);
  const createGroupModalToggle = () => {
    setCreateGroupModal(!createGroupModal)
  };
  
  const createGroup = (body) => {
    axios({
      method: 'post',
      url: baseURL + '/campaigns/' + campaign._id + '/NPCs/groups',
      data: body
    })
      .then(() => {
        console.log('increate')
        chooseCampaign(campaign._id)
        createGroupModalToggle()
      })
  }

  const createGroupInputs=[
    {
      key: 'name',
      name: 'Name',
      validations: {required: true},
      errorMessage: 'Please enter a title',
      type: 'text',
      sm: 6
    },
    {
      key: 'persuasion',
      validations: {required: true, validate: value => ['with', 'for', 'against'].includes(value)},
      name: 'persuasion',
      errorMessage: 'Please select a persuasion',
      type: 'text',
      sm: 6,
    }
  ]

  return (
    <div className={"ajs-flex-column" + classes.fullWidth} >
      <FormModal
        modal={createGroupModal}
        setModal={setCreateGroupModal}
        toggle={createGroupModalToggle}
        modalHeader="Create a New Group"
      >
        <InputForm
          inputs={createGroupInputs}
          submitFxn={createGroup}
          modalToggle={createGroupModalToggle}
        />
      </FormModal>
      <Button fullWidth variant="contained" color="secondary" onClick={createGroupModalToggle}>Create  +</Button>
      <div className="ajs-flex-column">
        {
          campaign.NPCs.groups.map((group) => {
            return(
              <Button 
                className={classes.groupButton} 
                color="primary" 
                variant={ selectedGroup._id === group._id ? "contained" : "outlined"}
                onClick={() => setSelectedGroup(group)}
              >
                {group.name}
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}
