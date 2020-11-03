import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormModal from './modules/FormModal'
import InputForm from './modules/InputForm'
import CampaignButtons from './modules/CampaignButtons'
import TopNav from './modules/TopNav'
import axios from 'axios';

const baseURL = 'http://localhost:3000'

const App = () => {
  const [campaignButtonModal, setCampaignButtonModal] = useState(true)
  const campaignButtonModalToggle = () => setCampaignButtonModal(!campaignButtonModal);
  
  const [createCampaignModal, setCreateCampaignModal] = useState(false)
  const createCampaignModalToggle = () => setCreateCampaignModal(!createCampaignModal);
  
  const [campaigns, setcampaigns] = useState([])
  const [campaign, setCampaign] = useState({title:'', NPCs:{groups:[]}})

  const getcampaigns = () => {
    axios.get(baseURL + '/campaigns')
      .then((response) => {
        setcampaigns(response.data)
      })
      .catch(err => console.log(err))
  }
  const chooseCampaign = (id) => {
    axios.get(baseURL + '/campaigns/' + id)
      .then((response) => {
        setCampaign(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const createCampaign = (body) => {
    if(body.image === '') {
      body.image = undefined
    }
    console.log(body)
    axios({
      method: 'post',
      url: baseURL + '/campaigns',
      data: body
    })
      .then((response) => {
        chooseCampaign(response.data._id)
        createCampaignModalToggle();
      })
  }

  const createCampaignInputs=[
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

  React.useEffect(() => {
    getcampaigns()
  }, [])



  return(
    <div>
      <FormModal 
        modal={campaignButtonModal} 
        setModal={setCampaignButtonModal} 
        modalHeader="Select or Create A Campaign"
        toggle={() => {}}
      >
        <CampaignButtons 
          campaigns={campaigns} 
          chooseCampaign={chooseCampaign}
          toggle={campaignButtonModalToggle}
          createCampaignModalToggle={createCampaignModalToggle}
        />
      </FormModal>
      <FormModal
        modal={createCampaignModal}
        setModal={setCreateCampaignModal}
        toggle={()=>{
          createCampaignModalToggle();
          campaignButtonModalToggle();
        }}
        modalHeader="Create a New Campaign"
      >
        <InputForm
          inputs={createCampaignInputs}
          submitFxn={createCampaign}
          modalToggle={createCampaignModalToggle}
        />
      </FormModal>
      <TopNav campaignButtonModalToggle={campaignButtonModalToggle} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('DM_Helper'));