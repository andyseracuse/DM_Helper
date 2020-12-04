import React, { useState }from 'react'
import { Button, Jumbotron, Container } from 'reactstrap'


export default function DefaultGroupsPane({ submitNewGroup, groupModalToggle }) {

  return (
    <div className='h-100 ajs-default-pane'>
      <Jumbotron className="h-100" fluid>
        <Container>
          <h1>This is the Groups Pane</h1>
          <hr className="my-2" />
          <p className="lead">Select a Group to view it's information, or use the buttons at the bottom to make changes.</p>
        </Container>
      </Jumbotron>
    </div>
  )
}
