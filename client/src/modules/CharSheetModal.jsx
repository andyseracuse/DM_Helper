import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import CampaignButtons from './CampaignButtons.jsx';
import Magnifier from 'react-magnifier';

const CharSheetModal = ({ modal, setModal, modalHeader, toggle, selectedMember }) => {
  const useStyles = makeStyles((theme) => ({
      charSheetContainer: {
        margin: 'auto',
        backgroundImage: `url("${selectedMember.characterSheetUrl}")`,
        objectFit: 'scale-down'
      },
      charSheet: {
        width: '100%'
      },
      header:{
        display: 'flex',
        justifyContent: 'center'
      }
  }));
  const classes = useStyles();

  return (    
    <div>
      <Modal size="lg" toggle={toggle} isOpen={modal}>
        <div className={classes.header}>
          <ModalHeader>{modalHeader}</ModalHeader>
        </div>
        <ModalBody>
          {/* <div className={classes.charSheet}></div> */}
          <div className={classes.charSheet}>
              <Magnifier src={selectedMember.charachterSheetUrl} mgHeight={200} mgWidth={200} className={classes.charSheet}/>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CharSheetModal;