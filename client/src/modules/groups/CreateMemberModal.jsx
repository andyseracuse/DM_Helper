import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, FormFeedback, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default function CreateMemberModal({ 
  createMemberModalActive, 
  toggleMemberModal, 
  baseURL, 
  chooseCampaign,
  setSelectedGroup,
  campaign,
  group
}) {

  const [name, setName] = useState('');
  const [voice, setVoice] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  }

  const submitNewMember = () => {
    axios({
      url: baseURL + '/campaigns/' + campaign._id + '/NPCs/groups/' + group._id + '/members',
      method: 'post',
      data: { 
        name: name,
        voice: voice,
      }
    })
      .then((response) => {
        console.log('is this updated?', response)
        chooseCampaign(campaign);
      })
      .then(() => {
        console.log('this should be updated', campaign)
        for(let i = 0; i < campaign.NPCs.groups.length; i++){
          if(campaign.NPCs.groups[i]._id === group._id){
            setSelectedGroup(campaign.NPCs.groups[i])
            break
          }    
        }
        toggleMemberModal();
      })
      .then(console.log(group))
      .catch(err =>  console.log(err))
  }


  // const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <Modal isOpen={createMemberModalActive} toggle={toggleMemberModal}>
        <ModalHeader className="ajs-flexbox-center">Create A New Member</ModalHeader>
        <ModalBody>
          <Form onSubmit={
            (e) => {
              if(name !== '' || voice != '') {
                e.preventDefault();
                submitNewMember();
              }
            }
          }>
            <FormGroup row>          
              <Label for="name text-right" sm={2}>Name:</Label>
              <Col sm={6}>
                <Input 
                valid={name === '' ? false : true} 
                invalid={name === '' ? true : false}
                onChange={handleNameChange} 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Add a Name"
              />
              {
                name === '' ? <FormFeedback>Please Enter a Name!</FormFeedback> : <FormFeedback valid>Great Name! Click submit to add the member</FormFeedback>
              }                
              </Col>
              <Col sm={4}>
              <Input 
                valid={voice === '' ? false : true} 
                invalid={voice === '' ? true : false}
                onChange={handleVoiceChange} 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Add a Voice"
              />
              {
                voice === '' ? <FormFeedback className="d-inline">Please select a voice!</FormFeedback> : <FormFeedback valid>Saucy! Click submit to add the group</FormFeedback>
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