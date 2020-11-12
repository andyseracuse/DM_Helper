import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider } from '@material-ui/core';
import axios from 'axios';
import FormModal from './FormModal'
import InputForm from './InputForm'
import Slider from 'react-slick'
import ActualMemberSelector from './ActualMemberSelector'

export default function MemberSelector({
  selectedGroup, 
  campaign, 
  setSelectedGroup, 
  baseURL, 
  chooseCampaign,
  setSelectedMember,
  selectedMember,
}) {

  ////////////////////////////////////////////////
  ////Styles
  ////////////////////////////////////////////////
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0 15% 0 15%"
    },
    carouselItem: {
      paddingTop: 25,
      display: 'flex  !important',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto'
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    centerOfPane: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    centerOfPaneTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 200
    },
    empty: {
      paddingTop: 25
    }
  }));
  const classes = useStyles();
  ////////////////////////////////////////////////////////
  ///////vars
  /////////////////////////////////////////////////////
  const createMemberInputs=[
    {
      key: 'name',
      name: 'Name',
      validations: {required: true},
      errorMessage: 'Please enter a name',
      type: 'text',
      sm: 6
    },
    {
      key: 'voice',
      name: 'Voice',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
    },
    {
      key: 'charachterSheetUrl',
      name: 'Character Sheet Url',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
    },
    {
      key: 'photo',
      name: 'photo',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      sm: 6,
    },
    {
      key: 'notes',
      name: 'Notes',
      errorMessage: 'Please chose a persuasion from "with", "for", or "against"',
      type: 'text',
      multiline: true,
      sm: 12,
    }
  ]
  ///////////////////////////////////////////////////
  /////states
  /////////////////////////////////////////////////
  const [createMemberModal, setCreateMemberModal] = useState(false)
  const toggleMemberModal = () => setCreateMemberModal(!createMemberModal)

  const createMember = (body) => {
    axios({
      method: 'post',
      url: baseURL + '/campaigns/' + campaign._id + '/NPCs/groups/' + selectedGroup._id + '/members',
      data: body
    })
      .then(() => {
        axios({
          method: 'get',
          url: baseURL + '/groups/' + selectedGroup._id
        })
          .then((response) => {
            console.log(response)
            setSelectedGroup(response.data);
            toggleMemberModal();
          })
      })
  }
  return(
    <div>
      <FormModal
          modal={createMemberModal}
          setModal={setCreateMemberModal}
          toggle={toggleMemberModal}
          modalHeader="Create a New Member"
        >
          <InputForm
            inputs={createMemberInputs}
            submitFxn={createMember}
            modalToggle={toggleMemberModal}
          />
        </FormModal>
        <ActualMemberSelector 
          selectedGroup={selectedGroup}
          toggleMemberModal={toggleMemberModal}
          createMemberModal={createMemberModal}
          setCreateMemberModal={setCreateMemberModal}
          createMember={createMember}
          setSelectedMember={setSelectedMember}
        />
        <Divider />
    </div>
  )
}
  

