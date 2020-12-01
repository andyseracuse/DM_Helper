import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import SignUp from './modules/SignUp';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './modules/Dashboard';
import Login from './modules/Login'
import PrivateRoute from './modules/PrivateRoute'
import AuthRoute from './modules/AuthRoute'

const App = () => {
  

  return(
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <AuthRoute path={"/signup"} component={SignUp} />
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('DM_Helper'));