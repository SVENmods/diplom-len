import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react"
import App from './App'
import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-3dii1a3asgknodvl.us.auth0.com"
  clientId="qeUybO8wGI0P5QDa1V3qrUxuyaZYO6iE"
  redirectUri={window.location.origin}>
  <App />
</Auth0Provider>
)
