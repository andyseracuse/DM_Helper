import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Alert } from 'reactstrap';
import InputForm from './InputForm';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

export default function ForgotPassword() {
  const { resetPassword, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  
  const forgotPasswordInputs=[
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
    }
  ]

  const handleSubmit = function(body) {
    setError('');
    setMessage('');
    setLoading(true)
    console.log(body.email)
    resetPassword(body.email)
      .then(() => setMessage('Success! Check your email for a reset link.'))
      .catch((err) => setError(err.code))
      .then(() => setLoading(false))
  }
  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center ajs-password-reset-container" style={{minHeight: "100vh"}}>
      <div className="w-100 d-flex flex-column align-items-center">
        <Card className="px-5">
          <div className="py-4 px-4">
            <CardTitle tag="h1" className="w-100 text-center">Password Reset</CardTitle>
            <Container>
              {error && <Alert className="text-center" color="danger">{error}</Alert>}
              {message && <Alert className="text-center" color="success">{message}</Alert>}
            </Container>
            <InputForm
              inputs={forgotPasswordInputs}
              submitFxn={handleSubmit}
              submitDisable={loading}
            />
            <div className="w-100 text-center mt-3"><Link to="/login">Login</Link> </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}