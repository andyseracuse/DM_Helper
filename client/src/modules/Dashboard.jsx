import React, { useState, useEffect} from 'react'
import FormModal from './FormModal'
import InputForm from './InputForm'
import CampaignButtons from './CampaignButtons'
import TopNav from './TopNav'
import GroupsView from './GroupsView'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { Container, Divider } from '@material-ui/core';

export default function Dashboard({ baseURL }) {
  const { currentUser } = useAuth()

  const [campaignButtonModal, setCampaignButtonModal] = useState(true)
  const campaignButtonModalToggle = () => setCampaignButtonModal(!campaignButtonModal);
  
  const [createCampaignModal, setCreateCampaignModal] = useState(false)
  const createCampaignModalToggle = () => setCreateCampaignModal(!createCampaignModal);
  
  const [campaigns, setcampaigns] = useState([])
  const [campaign, setCampaign] = useState({title:'', NPCs:{groups:[]}, default: true})
  const [selectedMember, setSelectedMember] = useState({default: true})
  const [selectedGroup, setSelectedGroup] = useState({_id: '', default:true, members:[]});


  const getcampaigns = () => {
    axios({
      url: baseURL + '/users/' + currentUser.uid + '/campaigns',
      method: 'GET'
    })
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
    axios({
      method: 'post',
      url: baseURL + '/users/' + currentUser.uid + '/campaigns',
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

  return (
    <div>
      <FormModal 
        modal={campaignButtonModal} 
        setModal={setCampaignButtonModal} 
        modalHeader="Select or Create A Campaign"
        toggle={() => {
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
          setCampaign={setCampaign}
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
      <Container component="main" maxWidth="md">
        {campaign && <p className={"text-center ajs-campaign-title"}>{'Campaign: ' + campaign.title}</p>}
        <div className="ajs-display-title-container-container">
          <div className="ajs-display-title-container">    
            <Divider className="my-3 ajs-campaign-title-divider" />  
          </div>
        </div>
      </Container>
      <GroupsView 
        campaign={campaign} 
        baseURL={baseURL} 
        chooseCampaign={chooseCampaign}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        />
    </div>
  )
}
