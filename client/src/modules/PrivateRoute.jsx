import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function PrivateRoute({ baseURL, component: Component, ...rest}) {
  const { currentUser } = useAuth();
  return (
    <div>
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component baseURL={baseURL} {...props} /> : <Redirect to="/login" />
        }}
      >
        
      </Route>
    </div>
  )
}
