import React, {useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import { purple, red, green } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import FormModal from './FormModal'
import CharSheetModal from './CharSheetModal'
import InputForm from './InputForm'
import axios from 'axios';




export default function InfoPaneButtons( { selectedMember, setSelectedMember, baseURL, getGroup }) {
  const useStyles = makeStyles((theme) => ({
    containedPurple: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      "&:hover": {
        backgroundColor: purple[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: purple[500]
        }
      },
      width: '100%'
    },
    containedRed: {
      color: theme.palette.getContrastText(purple[500]),
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
    containedGreen: {
      width: '100%',
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: green[500]
        }
      },
      charSheetContainer: {
        width: 100
      },
      charSheet: {

      }
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
  const classes = useStyles();

  const editMember = (body) => {
    console.log(body)
    axios({
      method: 'put',
      url: baseURL + '/members/' + selectedMember._id,
      data: body
    })
      .then(() => {
        axios({
          method: 'get',
          url: baseURL + '/members/' + selectedMember._id,
          data: body
        })
          .then((response) => {
            console.log(response)
            getGroup();
            setSelectedMember(response.data)
            editCharModalToggle();
          })
      })
  }
  const deleteMember = () => {
    axios({
      method: 'delete',
      url: baseURL + '/members/' + selectedMember._id
    })
      .then(() => {
          getGroup();
          setSelectedMember({default: true})
          deleteModalToggle();
        })
  }

  const [charSheetModal, setCharSheetModal] = useState(false)
  const charSheetModalToggle = () => {setCharSheetModal(!charSheetModal)}

  const [editCharModal, setEditCharModal] = useState(false)
  const editCharModalToggle = () => {setEditCharModal(!editCharModal)}

  const [deleteModal, setDeleteModal] = useState(false)
  const deleteModalToggle = () => {setDeleteModal(!deleteModal)}

  const editMemberInputs=[
    {
      key: 'name',
      name: 'Name',
      validations: {required: true},
      errorMessage: 'Please enter a name',
      type: 'text',
      sm: 6,
      startVal: selectedMember.name
    },
    {
      key: 'voice',
      name: 'Voice',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
      startVal: selectedMember.voice
    },
    {
      key: 'charachterSheetURL',
      name: 'Character Sheet URL',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
      startVal: selectedMember.characterSheetURL
    },
    {
      key: 'photo',
      name: 'photo',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
      startVal: selectedMember.photo
    },
    {
      key: 'notes',
      name: 'Notes',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      multiline: true,
      sm: 12,
      startVal: selectedMember.notes
    }
  ]

  return (
    <div className="ajs-column-flex space spaceAround">
      <CharSheetModal
        modal={charSheetModal}
        setModal={setCharSheetModal}
        toggle={charSheetModalToggle}
        modalHeader={selectedMember.name + "'s Character Sheet"}
        selectedMember={selectedMember}
      >
        <div className={classes.charSheetContainer}>
         hello
          <img className={classes.charSheet} src={selectedMember.charsheetUrl}/>
        </div >
      </CharSheetModal>
      <FormModal
        modal={editCharModal}
        setModal={setEditCharModal}
        toggle={editCharModalToggle}
        modalHeader="Edit Character"
      >
        <InputForm
          inputs={editMemberInputs}
          submitFxn={editMember}
          modalToggle={editCharModalToggle}
        />
      </FormModal>
      <FormModal
        modal={deleteModal}
        setModal={setDeleteModal}
        toggle={deleteModalToggle}
        modalHeader="Edit Character"
      >
          <div className={classes.deleteContainer} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className={classes.warn}>Are you sure you want to delete {selectedMember.name}?</h4>
              </Grid>
              <Grid item xs={12}>
              <Button onClick={deleteMember} fullWidth className={classes.containedRed}>Delete Member</Button>
              </Grid>
            </Grid>
          </div>
      </FormModal>
      <Button onClick={charSheetModalToggle} className={classes.containedGreen}>Character Sheet</Button>
      <Button onClick={editCharModalToggle} className={classes.containedPurple}>Edit Member</Button>
      <Button onClick={deleteModalToggle} fullWidth className={classes.containedRed}>Delete Member</Button>
    </div>
  )
}
