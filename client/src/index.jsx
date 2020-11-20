import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormModal from './modules/FormModal'
import InputForm from './modules/InputForm'
import CampaignButtons from './modules/CampaignButtons'
import TopNav from './modules/TopNav'
import GroupsView from './modules/GroupsView'
import axios from 'axios';
import SignUp from './modules/SignUp';

const baseURL = 'http://localhost:3000'

const App = () => {
  const [campaignButtonModal, setCampaignButtonModal] = useState(true)
  const campaignButtonModalToggle = () => setCampaignButtonModal(!campaignButtonModal);
  
  const [createCampaignModal, setCreateCampaignModal] = useState(false)
  const createCampaignModalToggle = () => setCreateCampaignModal(!createCampaignModal);
  
  const [campaigns, setcampaigns] = useState([])
  const [campaign, setCampaign] = useState({title:'', NPCs:{groups:[]}, default: true})
  const [selectedMember, setSelectedMember] = useState({default: true})
  const [selectedGroup, setSelectedGroup] = useState({default:true, members:[]});


  const getcampaigns = () => {
    axios.get(baseURL + '/campaigns')
      .then((response) => {
        setcampaigns(response.data)
      })
      .catch(err => console.log(err))
  }
  const chooseCampaign = (id) => {
    console.log('in choose campaign')
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
      <SignUp />
      {/* <FormModal 
        modal={campaignButtonModal} 
        setModal={setCampaignButtonModal} 
        modalHeader="Select or Create A Campaign"
        toggle={() => {
          console.log(campaign.default)
          if(campaign.default === undefined){
            campaignButtonModalToggle();
          }
        }}
      >
        <CampaignButtons 
          baseURL={baseURL}
          campaigns={campaigns} 
          chooseCampaign={chooseCampaign}
          toggle={campaignButtonModalToggle}
          createCampaignModalToggle={createCampaignModalToggle}
          getcampaigns={getcampaigns}
          campaign={campaign}
          setSelectedGroup={setSelectedGroup}
          setSelectedMember={setSelectedMember}
        />
      </FormModal>
      <FormModal
        modal={createCampaignModal}
        setModal={setCreateCampaignModal}
        toggle={()=>{
          setSelectedGroup({default:true, members:[]})
          setSelectedMember({default: true})
          setSelectedMember({default: true})
          createCampaignModalToggle();
          campaignButtonModalToggle();
        }}
        modalHeader="Create a New Campaign"
      >
        <InputForm
          inputs={createCampaignInputs}
          submitFxn={(body) => {
            setSelectedGroup({default:true, members:[]})
            setSelectedMember({default: true})
            createCampaign(body)
          }}
          modalToggle={() => {
            setSelectedGroup({default:true, members:[]})
            setSelectedMember({default: true})
            createCampaignModalToggle()
          }}
        />
      </FormModal>
      <TopNav campaignButtonModalToggle={campaignButtonModalToggle} getcampaigns={getcampaigns} />
      <GroupsView 
        campaign={campaign} 
        baseURL={baseURL} 
        chooseCampaign={chooseCampaign}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      /> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('DM_Helper'));