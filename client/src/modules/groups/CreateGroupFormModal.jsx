import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, FormFeedback, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default function CreateGroupFormModal({ 
  groupModalActivated, 
  groupModalToggle, 
  baseURL, 
  chooseCampaign, 
  setGroupModalActivated,
  campaign
}) {

  const [name, setName] = useState('');
  const [persuasion, setPersuasion] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const submitNewGroup = () => {
    axios({
      url: baseURL + '/campaigns/' + campaign._id + '/NPCs/groups',
      method: 'post',
      data: { 
        name: name,
        persuasion: persuasion,
        members: [] 
      }
    })
    .then((response) => {
      setGroupModalActivated(false);
      chooseCampaign(campaign)
      toggle()
    })
  }


  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <Modal isOpen={groupModalActivated} toggle={groupModalToggle}>
        <ModalHeader className="ajs-flexbox-center">Create A New Group</ModalHeader>
        <ModalBody>
          <Form onSubmit={
            (e) => {
              if(name !== '' || persuasion != '') {
                e.preventDefault();
                submitNewGroup();
              }
            }
          }>
            <FormGroup row>          
              <Label for="name text-right" sm={2}>Name:</Label>
              <Col sm={6}>
                <Input 
                valid={name === '' ? false : true} 
                invalid={name === '' ? true : false}
                onChange={handleChange} 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Add a Name"
              />
              {
                name === '' ? <FormFeedback>Please Enter a Name!</FormFeedback> : <FormFeedback valid>Great Name! Click submit to add the group</FormFeedback>
              }                
              </Col>
              <Col sm={4}>
              <Dropdown className="w-100" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="w-100" caret>
                  Persuasion
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => {setPersuasion('with')}}>With</DropdownItem>
                  <DropdownItem onClick={() => {setPersuasion('against')}}>Against</DropdownItem>
                  <DropdownItem onClick={() => {setPersuasion('nuetral')}}>Nuetral</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {
              persuasion === '' ? <FormFeedback className="d-inline">Please select a persuasion!</FormFeedback> : <div></div>
              } 
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 12 }}>
                <Button className="w-100" color="primary">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}
