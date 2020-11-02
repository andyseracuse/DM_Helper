import React, { useState }from 'react'
import { Button, Jumbotron, Container } from 'reactstrap'


export default function DefualtGroupsPane({ submitNewGroup, groupModalToggle }) {

  return (
    <div className='ajs-default-pane'>
      <Jumbotron fluid>
        <Container fluid>
          <h1>This is the Groups Pane</h1>
          <p className="lead">Select a Group to view it's information, or use the buttons at the bottom to make changes.</p>
          <hr className="my-2" />
          <p className="d-flex justify-content-center">
            <Button onClick={groupModalToggle} color="primary">Create New</Button>
          </p>
        </Container>
      </Jumbotron>
    </div>
  )
}
