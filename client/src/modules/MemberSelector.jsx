import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import FormModal from './FormModal'
import InputForm from './InputForm'
import Slider from 'react-slick'

export default function MemberSelector({
  selectedGroup, 
  campaign, 
  setSelectedGroup, 
  baseURL, 
  chooseCampaign,
  setSelectedMember,
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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
      key: 'charachterSheetURL',
      name: 'Character Sheet URL',
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
          url: baseURL + '/members/' + selectedGroup._id
        })
          .then((response) => {
            console.log(response)
            setSelectedGroup(response.data);
            toggleMemberModal();
          })
      })
  }

  if(selectedGroup.default) {
    return (
      <div className={classes.root}>
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
        <div className={classes.centerOfPaneTop}>
          <svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>
        </div>
        <h1 className={classes.centerOfPane}>The Groups Pane</h1>
      </div>
    )} 
    if(selectedGroup.members.length === 0){
      return (
        <div onClick={toggleMemberModal} className={"ajs-column-flex " + classes.empty}>
          <Avatar className={classes.large}>+</Avatar>
          <p>
            Create New
          </p>
        </div>
      )
    }
    return (
      <div className={classes.root}>
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
        <Slider
          {...settings}
        >
          { 
            selectedGroup.members.map((member, index) => {
              return (
                <div className={classes.carouselItem}>
                  <Avatar onClick={() => setSelectedMember(member)} src={member.photo !== undefined ? member.photo : null} className={classes.large}>{member.name}</Avatar>
                  <p>
                    {member.name}
                  </p>
                </div>
              )
            })
          }
          <div onClick={toggleMemberModal} className={classes.carouselItem}>
            <Avatar className={classes.large}>+</Avatar>
            <p>
              Create New
            </p>
          </div>
        </Slider>
      </div>
    )
  
}

