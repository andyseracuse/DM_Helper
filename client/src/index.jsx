import React, { useState, useEffect } from 'react';
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
import ForgotPassword from './modules/ForgotPassword'

const baseURL = 'http://localhost:3000'

const App = () => {

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
      <Router>
        <AuthProvider>
          <Switch>
            <AuthRoute path={"/signup"} baseURL={baseURL} component={SignUp} />
            <AuthRoute path="/login" baseURL={baseURL} component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/" baseURL={baseURL} component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('DM_Helper'));