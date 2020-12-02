import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Alert } from 'reactstrap';
import InputForm from './InputForm';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function SignUp({ baseURL }) {
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const signUpInputs=[
    {
      key: 'email',
      name: 'Email',
      validations: {
        required: 'Please enter a valid email',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        }
      },
      errorMessage: 'Please enter a valid email',
      type: 'text',
      xs: 12
    },
    {
      key: 'password',
      name: 'Password',
      validations: {
        required: {
          value: true,
          message: "You must specify a password"
        },
        minLength: {
          value: 8,
          message: "Your Password must be at least 8 characters"
        }
      },
      type: 'password',
      xs: 12
    },
    {
      key: 'repeat_password',
      name: 'Confirm Password',
      validations: {
        required: {
          value: true,
          message: "Please re-type your password"
        }
      },
      type: 'repeat_password',
      xs: 12
    }
  ]
  
  const createUser = function(uid, image) {
    console.log('uid:', uid, "and image:", image)
    if(image === '') {
      body.image = undefined
    }
    console.log('increateuser url')
    axios({
      method: 'POST',
      url: baseURL + '/users',
      data: {uid, image}
    })
  }
  const handleSubmit = function(body) {
    setLoading(true)
    signup(body.email, body.password)
      .then((response) => {
        console.log('submit handle')
        createUser(response.user.uid, body.image);
        // createUser(response.user.uid, body.image)
      })
      .catch((err) => setError(err.code))
      .then(() => setLoading(false))
  }
  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100 d-flex flex-column align-items-center">
        <Card>
          <div className="py-3">
            <CardTitle tag="h1" className="w-100 text-center">Sign Up</CardTitle>
            <Container>
              {error && <Alert className="text-center" color="danger">{error}</Alert>}
            </Container>
            <InputForm
              inputs={signUpInputs}
              submitFxn={handleSubmit}
              submitDisable={loading}
            />
          </div>
        </Card>
        <div>
          Already Have An Account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  )
}
