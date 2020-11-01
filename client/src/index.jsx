import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import Dashboard from './modules/Dashboard.jsx'

const baseURL = 'http://localhost:3000'


const App = () => {
  const [modal, setModal] = useState(true)
  const [campaignTitles, setcampaignTitles] = useState([])
  const [campaign, setCampaign] = useState({})

  const getcampaignTitles = () => {
    axios.get(baseURL + '/campaigns')
      .then((response) => {
        setcampaignTitles(response.data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getcampaignTitles()
  }, [])

  const toggle = () => setModal(!modal);

  const chooseCampaign = (campaign) => {
    console.log(campaign)
    axios.get(baseURL + '/campaigns/' + campaign._id)
      .then((response) => {
        setCampaign(response.data)
        toggle()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return(
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="ajs-flexbox-center">Choose A Campaign!</ModalHeader>
        <ModalBody>
          {campaignTitles.map((titleObject, index) => {
            return (
              <div className="ajs-flexbox-center row">
                <Button onClick={() => {chooseCampaign(titleObject)}} className="col-8" color="primary">{titleObject.title} </Button>
              </div>
            )
          })}
        </ModalBody>
      </Modal>
      <Dashboard campaign={campaign} campaignTitles={campaignTitles}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('productInfo'));