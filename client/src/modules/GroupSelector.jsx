import React, {useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormModal from './FormModal';
import InputForm from './InputForm';
import axios from 'axios';
import { red, } from "@material-ui/core/colors";



const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%"
  },
  groupButton: {
    width: '100%',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #3f51b5'
    },
    overflow: 'hidden'
  },
  containedRed: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: red[500]
      },
      width: '100%'
    },
  },
  warn: {
    margin: '0 5% 0 15%',
    textAlign: 'center',
    color: '#d54f46'
  },
  deleteContainer: {
    margin: '0 10% 0 10%'
  }
}));

export default function GroupSelector({ 
  campaign, 
  chooseCampaign, 
  selectedGroup, 
  setSelectedGroup,
  baseURL,
  selectedMember,
  setSelectedMember
}) {
  const classes = useStyles();

  const [createGroupModal, setCreateGroupModal] = useState(false);
  const createGroupModalToggle = () => {
    setCreateGroupModal(!createGroupModal)
  };

  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const deleteGroupModalToggle = () => {
    setDeleteGroupModal(!deleteGroupModal)
  };

  const [editGroupModal, setEditGroupModal] = useState(false);
  const editGroupModalToggle = () => {
    setEditGroupModal(!editGroupModal)
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
  const deleteGroup = () => {
    axios({
      method: 'delete',
      url: baseURL + '/groups/' + selectedGroup._id,
    })
      .then(() => {
        deleteGroupModalToggle();
        setSelectedGroup({_id: '', default:true, members:[]})
        chooseCampaign(campaign._id);
        setSelectedMember({default: true})
      })
  }
  const editGroup = (body) => {
    axios({
      method: 'put',
      url: baseURL + '/groups/' + selectedGroup._id,
      data: body
    })
      .then(() => {
        editGroupModalToggle();
        chooseCampaign(campaign._id);
        setSelectedMember({default: true})
      })
  }

  const createGroupInputs=[
    {
      key: 'name',
      name: 'Name',
      validations: {required: true},
      errorMessage: 'Please enter a name',
      type: 'text',
      sm: 6
    },
    {
      key: 'persuasion',
      selectValues: ['with', 'against', 'nuetral'],
      validations: {required: true, validate: value => ['with', 'against', 'nuetral'].includes(value)},
      name: 'persuasion',
      errorMessage: 'Please chose a persuasion from "with", "against", or "nuetral"',
      type: 'dropdown',
      sm: 6,
    }
  ]
  const editGroupInputs=[
    {
      key: 'name',
      name: 'Name',
      validations: {required: true},
      errorMessage: 'Please enter a name',
      type: 'text',
      sm: 6,
      startVal: selectedGroup.name
    },
    {
      key: 'persuasion',
      selectValues: ['with', 'against', 'nuetral'],
      validations: {required: true, validate: value => ['with', 'against', 'nuetral'].includes(value)},
      name: 'persuasion',
      errorMessage: 'Please chose a persuasion from "with", "against", or "nuetral"',
      type: 'dropdown',
      sm: 6,
      startVal: selectedGroup.persuasion
    }
  ]

  const iconSelector = function(persuasion) {
    if(persuasion === 'with') {
      return (
        <svg className="ajs-group-icons bi bi-emoji-heart-eyes" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path fill-rule="evenodd" d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/>
        </svg>
      )
    }
    if(persuasion === 'against') {
      return (
        <svg className="ajs-group-icons bi bi-emoji-angry" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path fill-rule="evenodd" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"/>
          <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
          <path fill-rule="evenodd" d="M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 1 1-.447.894l-2-1a.5.5 0 0 1-.223-.67zm7.894 0a.5.5 0 0 0-.67-.223l-2 1a.5.5 0 1 0 .447.894l2-1a.5.5 0 0 0 .223-.67z"/>
        </svg>
      )
    }
    if(persuasion === 'nuetral') {
      return (
        <svg className="ajs-group-icons bi bi-emoji-angry" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path fill-rule="evenodd" d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        </svg>
      )
    }
  }

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
      <FormModal
        modal={editGroupModal}
        setModal={setEditGroupModal}
        toggle={editGroupModalToggle}
        modalHeader="Create a New Group"
      >
        <InputForm
          inputs={editGroupInputs}
          submitFxn={editGroup}
          modalToggle={editGroupModalToggle}
        />
      </FormModal>
      <FormModal
        modal={deleteGroupModal}
        setModal={setDeleteGroupModal}
        toggle={deleteGroupModalToggle}
        modalHeader={`Delete ${campaign.title}`}
      >
          <div className={classes.deleteContainer} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className={classes.warn}>Are you sure you want to delete?</h4>
              </Grid>
              <Grid item xs={12}>
              <Button onClick={deleteGroup} fullWidth className={classes.containedRed}>Delete Group</Button>
              </Grid>
            </Grid>
          </div>
      </FormModal>
      <Button fullWidth variant="contained" color="secondary" onClick={createGroupModalToggle}>Create  +</Button>
      <div className="ajs-flex-column">
        {
          campaign.NPCs.groups.map((group) => {
            return(
              <div className="ajs-container ajs-group-buttons">
                <div>
                  <svg onClick={() => {
                    setSelectedGroup(group)
                    deleteGroupModalToggle();
                  }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </div>
                <Button 
                  className={classes.groupButton} 
                  color="primary" 
                  variant={ selectedGroup._id === group._id ? "contained" : "outlined"}
                  onClick={() => {
                    setSelectedGroup(group);
                    setSelectedMember({default: true})
                  }}
                >
                  {group.name + ' '}
                  {iconSelector(group.persuasion)}
                </Button>
                <div>
                <svg onClick={() => {
                  setSelectedGroup(group);
                  editGroupModalToggle();
                }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
