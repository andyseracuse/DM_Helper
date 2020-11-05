import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormModal from './FormModal';
import { red, } from "@material-ui/core/colors";
import axios from 'axios';
import { Grid, Button } from '@material-ui/core'
import InputForm from './InputForm'

export default function CampaignModals({ deleteCampaignModal, setDeleteCampaignModal, setEditCampaignModal, toggledeleteCampaignModal, editCampaignModal, toggleEditCampaignModal, getcampaigns, toggleCampaignButtonModal, baseURL, campaign }) {

  const deleteCampaign = () => {
    axios({
      method: 'delete',
      url: baseURL + '/campaigns/' + campaign._id,
    })
      .then(() => {
        getcampaigns();
        toggledeleteCampaignModal();
      })
  }
  const editCampaign = (body) => {
    axios({
      method: 'put',
      url: baseURL + '/campaigns/' + campaign._id,
      data: body
    })
      .then(() => {
        getcampaigns();
        toggleEditCampaignModal();
      })
  }

  const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();

  const editCampaignInputs=[
    {
      key: 'title',
      name: 'Title',
      validations: {required: true},
      errorMessage: 'Please enter a title',
      type: 'text',
      sm: 6
    },
    {
      key: 'image',
      name: 'Photo Url',
      errorMessage: 'Please enter a photo Url',
      type: 'text',
      sm: 6
    }
  ]

  return (
    <div>
      <FormModal
        modal={deleteCampaignModal}
        setModal={setDeleteCampaignModal}
        toggle={toggledeleteCampaignModal}
        modalHeader="Create a New Campaign"
      >
          <div className={classes.deleteContainer} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className={classes.warn}>Are you sure you want to delete?</h4>
              </Grid>
              <Grid item xs={12}>
              <Button onClick={deleteCampaign} fullWidth className={classes.containedRed}>Delete Member</Button>
              </Grid>
            </Grid>
          </div>
      </FormModal>
      <FormModal
        modal={editCampaignModal}
        setModal={setEditCampaignModal}
        toggle={toggleEditCampaignModal}
        modalHeader={`Update ${campaign.title}`}
      >
        <InputForm
          inputs={editCampaignInputs}
          submitFxn={editCampaign}
          modalToggle={toggleEditCampaignModal}
        />
      </FormModal>
    </div>
  )
}
