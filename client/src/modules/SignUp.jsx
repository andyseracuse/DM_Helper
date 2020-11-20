import { Container } from '@material-ui/core';
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import InputForm from './InputForm';

export default function SignUp() {

  const signUpInputs=[
    {
      key: 'email',
      name: 'Email',
      validations: {
        required: true,
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
        required: true
      },
      errorMessage: 'Please enter a password',
      type: 'password',
      sm: 12
    }
  ]

  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100 d-flex flex-column align-items-center">
        <Card>
          <CardTitle tag="h1" className="w-100 text-center">Sign Up</CardTitle>
          <InputForm
            inputs={signUpInputs}
            submitFxn={(body)=>{console.log(body)}}
          />
        </Card>
        <div>
          Already Have An Account? Log In
        </div>
      </div>
    </Container>
  )
}
