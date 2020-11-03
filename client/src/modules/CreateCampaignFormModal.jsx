import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import axios from 'axios';
import { title } from 'process';

export default function CreateCampaignForm( { 
  createCampaignModal, 
  createCampaigntoggle, 
  baseURL,
  setCampaign,
  setCreateCampaignModal
}) {

  const submitNewCampaign = () => {
    axios({
      url: baseURL + '/campaigns',
      method: 'post',
      data: { title: titleInput}
    })
    .then((response) => {
      setCreateCampaignModal(false);
      setCampaign(response.data);
    })
  }
  const [titleInput, setTitleInput] = useState('')

  const handleChange = (event) => {
    setTitleInput(event.target.value);
  }

  return (
    <div>
      <Modal isOpen={createCampaignModal} toggle={createCampaigntoggle}>
        <ModalHeader className="ajs-flexbox-center">Create A New Campgaign</ModalHeader>
        <ModalBody>
          <Form onSubmit={
            (e) => {
              if(titleInput !== '') {
                e.preventDefault();
                submitNewCampaign();
              }
            }
          }>
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col sm={7}>
                <Input 
                valid={titleInput === '' ? false : true} 
                invalid={titleInput === '' ? true : false}
                onChange={handleChange} type="text" name="title" id="title" 
                placeholder="Add a Title"
              />
              {
                titleInput === '' ? <FormFeedback>Please Enter a Title!</FormFeedback> : <FormFeedback valid>Great title! Click submit to start your adventure!</FormFeedback>
              }                
              </Col>
              <Col sm="3">
                <Button color="primary">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}
