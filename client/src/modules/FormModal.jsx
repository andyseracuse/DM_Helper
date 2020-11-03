import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CampaignButtons from './CampaignButtons.jsx'

const FormModal = ({ modal, setModal, children, modalHeader, toggle }) => {

  return (
    <div>
      <Modal toggle={toggle} isOpen={modal}>
        <div className="ajs-flex-column">
          <ModalHeader>{modalHeader}</ModalHeader>
        </div>
        <ModalBody>
          {children}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default FormModal;