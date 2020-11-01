import React, { useState, useEffect } from 'react';


import { Jumbotron, Button, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Dashboard = ({ campaign, campaignTitles}) => {

  const classes = useStyles();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <Jumbotron>
        <Row>
          <Col sm="10">
            <h1 className="display-4">Campaign: { campaign.title}</h1>
          </Col>
          <Col sm="2">
            <Avatar alt="your account" className={classes.large} src="https://i.pinimg.com/564x/57/38/bf/5738bf89d5dbcc84189f0475826cd023.jpg" />
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                Dropdown
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Campaigns</DropdownItem>
                {
                  campaignTitles.map((titleObject, index) => {
                    return <DropdownItem key={titleObject.title}>{titleObject.title}</DropdownItem>
                  })
                }
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
          <Button color="primary">Learn More</Button>
      </Jumbotron>
    </div>
  );
};

export default Dashboard