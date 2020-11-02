import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import Dashboard from './modules/Dashboard.jsx';
import GroupsView from './modules/groups/GroupsView.jsx'

const baseURL = 'http://localhost:3000'


const App = () => {
  const [modal, setModal] = useState(true)
  const [campaignTitles, setcampaignTitles] = useState([])
  const [campaign, setCampaign] = useState({title:'', NPCs:{groups:[]}})

  const getCampaignTitles = () => {
    axios.get(baseURL + '/campaigns')
      .then((response) => {
        setcampaignTitles(response.data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getCampaignTitles()
  }, [])

  const toggle = () => setModal(!modal);

  const chooseCampaign = (titleObject) => {
    axios.get(baseURL + '/campaigns/' + titleObject._id)
      .then((response) => {
        setCampaign(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return(
    <div>
      <Modal isOpen={modal}>
        <ModalHeader className="ajs-flexbox-center">Choose A Campaign!</ModalHeader>
        <ModalBody>
          {campaignTitles.map((titleObject, index) => {
            return (
              <div className="ajs-flexbox-center row">
                <Button 
                  onClick={() => { 
                    chooseCampaign(titleObject);
                    toggle();
                  }} 
                  className="col-8" 
                  color="primary">{titleObject.title}
                </Button>
              </div>
            )
          })}
        </ModalBody>
      </Modal>
      <Dashboard 
        getCampaignTitles={getCampaignTitles}
        campaign={campaign}
        chooseCampaign={chooseCampaign}
        campaignTitles={campaignTitles}
        baseURL={baseURL}
        setCampaign={setCampaign}
      />
      <GroupsView 
        campaign={campaign}
        chooseCampaign={chooseCampaign}
        baseURL={baseURL}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('productInfo'));