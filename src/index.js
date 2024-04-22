import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import ContextProvider from './context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>

  //React.Strictmode causes useEfect to render twice
)
