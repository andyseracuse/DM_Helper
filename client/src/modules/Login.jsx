import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Alert } from 'reactstrap';
import InputForm from './InputForm';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
  const { login, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const loginInputs=[
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
      type: 'password',
      xs: 12
    }
  ]

  const handleSubmit = function(body) {
    setLoading(true)
    login(body.email, body.password)
      .then((res) => {
        console.log('in login submit', res)
      })
      .catch((err) => setError(err.code))
      .then(() => setLoading(false))
  }
  return (
    <Container maxWidth="sm" className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100 d-flex flex-column align-items-center">
        <Card>
          <div className="py-3">
            <CardTitle tag="h1" className="w-100 text-center">Log In</CardTitle>
            <Container>
              {error && <Alert className="text-center" color="danger">{error}</Alert>}
            </Container>
            <InputForm
              inputs={loginInputs}
              submitFxn={handleSubmit}
              submitDisable={loading}
            />
            <div className="w-100 text-center mt-3"><Link to="/forgot-password">Forgot Password?</Link> </div>
          </div>
        </Card>
        <div>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}