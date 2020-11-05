import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import campaign from '../../../../../../database-mongo/models/campaign';
import CampaignModals from './CampaignModals.jsx'


export default function CampaignButtons({ campaigns, getcampaigns, chooseCampaign, createCampaignModalToggle, toggle, baseURL, campaign }) {
  const images = campaigns.map((campaign => {
    return ({
      url: campaign.image,
      title: campaign.title,
      width: '80%',
      id: campaign._id
    })
  }))
  const createNew ={
    url: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/8/1/1375354802439/Blue---the-colour-008.jpg?width=620&quality=85&auto=format&fit=max&s=70ccd08a941b37cc448197f259ae7f7d',
    title: 'Create New +',
    width: '80%'
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },
    image: {
      position: 'relative',
      marginTop: 5,
      marginBottom: 5,
      height: 100,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));
  const classes = useStyles();

  const [deleteCampaignModal, setDeleteCampaignModal] = useState(false)
  const toggleDeleteCampaignModal = () => setDeleteCampaignModal(!deleteCampaignModal);
  
  return (
    <div className={classes.root}>
      <CampaignModals 
        deleteCampaignModal={deleteCampaignModal}
        toggledeleteCampaignModal={toggleDeleteCampaignModal} 
        // editCampaignModal={editCampaignModal}
        // toggleEditCampaignModal={toggleEditCampaignModal} 
        getcampaigns={getcampaigns} 
        toggleCampaignButtonModal={toggle}
        baseURL={baseURL}
        campaign={campaign}
      />
        <ButtonBase
          focusRipple
          key={createNew.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: createNew.width,
          }}
          onClick={()=> {
            toggle();
            createCampaignModalToggle();
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${createNew.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {createNew.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      {images.map((image) => (
        <div className='ajs-container'>
          <div>
            <svg onClick={() => {
              chooseCampaign(image.id);
              toggleDeleteCampaignModal();
            }} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </div>
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
            onClick={()=> {
              chooseCampaign(image.id);
              toggle();
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
          <div>
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
