import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText, 
  Dropdown,
  Alert
} from 'reactstrap';
import { Avatar, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: 5
  },
  divider: {
    marginRight: 5,
    marginLeft: 5,
    color: 'grey'
  },
  navItem: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  entireNav: {
    marginBottom: 20
  }
}));

export default function TopNav({ campaignButtonModalToggle, getcampaigns }) {
  const classes = useStyles();
  const { currenUser, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

  const [error, setError] = useState(false)

  const history = useHistory();

  const auth = useAuth();

  const HandleLogout = function() {
    setError('')
    
    logout()
      .then(
        history.push('/login')
      )
      .catch(
        setError(error)
      )
  }

  return (
    <div className={classes.entireNav}>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">DM Helper</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" pills navbar>
            <NavItem className={classes.navItem}>
              <NavLink>Items</NavLink>
            </NavItem>
            <NavItem className={classes.navItem}>
              <NavLink>Maps</NavLink>
            </NavItem>
            <NavItem className={classes.navItem}>
              <NavLink>Encounters</NavLink>
            </NavItem>
            <NavItem className={classes.navItem}>
              <NavLink>Party</NavLink>
            </NavItem>
            <NavItem className={classes.navItem}>
              <NavLink active>NPCs</NavLink>
            </NavItem>
            <Divider 
              orientation="vertical" 
              flexItem 
              className={classes.divider}
            />
            <NavItem className={classes.navItem}>
              <NavLink onClick={() => {
                getcampaigns();
                campaignButtonModalToggle();
              }}>Campaigns</NavLink>
            </NavItem>  
            <Divider 
              orientation="vertical" 
              flexItem 
              className={classes.divider}
            />
            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle} nav inNavbar>
              <DropdownToggle
                data-toggle="dropdown"
                aria-aria-expanded={dropdownOpen}
              >
                <Avatar 
                  src="https://i.pinimg.com/564x/57/38/bf/5738bf89d5dbcc84189f0475826cd023.jpg" 
                  className={classes.large}>
                </Avatar>
                Account
              </DropdownToggle>
              <DropdownMenu right
                onClick={() => {
                  dropdownToggle()
                  HandleLogout()
                }}
              >
                <div className="text-center" >Logout</div>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
      {error && <Alert color="danger"></Alert>}
    </div>
  );
}
