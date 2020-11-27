import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import InputForm from './InputForm';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState()
  
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
      sm: 12
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
      sm: 12
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
      sm: 12
    }
  ]

  const handleSubmit = function(body) {
    // console.log(body)
    // signup(...body)
  }

  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100 d-flex flex-column align-items-center">
        <Card>
          <div className="py-3">
            <CardTitle tag="h1" className="w-100 text-center">Sign Up</CardTitle>
            <InputForm
              inputs={signUpInputs}
              submitFxn={(body) => {signup(body.email, body.password)}}
            />
          </div>
        </Card>
        <div>
          Already Have An Account? Log In
        </div>
      </div>
    </Container>
  )
}
