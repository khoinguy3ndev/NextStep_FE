import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { ApolloAppProvider } from './app/providers/apollo'
import './app/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloAppProvider>
      <App />
    </ApolloAppProvider>
  </React.StrictMode>
)
