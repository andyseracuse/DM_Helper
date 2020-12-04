import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import axios from 'axios';
import FormModal from './FormModal'
import InputForm from './InputForm'
import Slider from 'react-slick'

export default function ActualMemberSelector({ 
  selectedGroup, 
  toggleMemberModal, 
  createMemberModal,
  setCreateMemberModal,
  createMember,
  setSelectedMember
}) {

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false
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
      margin: 'auto',
      textAlign: 'center'
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    create: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      background: 'none',
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
      multiline: true,
      sm: 12,
    }
  ]


    if (selectedGroup.members.length === 0 && selectedGroup.default === undefined){
      return(
        <div onClick={toggleMemberModal} className={classes.carouselItem}>
        <Avatar className={classes.create}>
          <Button className="ajs-create-member-button" variant="contained" color="secondary">
            <div>
              +
            </div>
          </Button>
        </Avatar>
        <p>
          Create New
        </p>
      </div>
      )
    }
    if(selectedGroup.default === undefined && selectedGroup.members.length !== 0){
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
            <Avatar className={classes.create}>
              <Button className="ajs-create-member-button" variant="contained" color="secondary">
                <div>
                  +
                </div>
              </Button>
            </Avatar>
            <p>
              Create New
            </p>
          </div>
        </Slider>
      </div>
      )
    }else{
      return <div></div>
    }
    
}
