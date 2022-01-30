import React from 'react'
import App from '../App/App'
import ApolloAppProvider from '../App/ApolloAppProvider'

const PlayApp = () => {
  return (
    <ApolloAppProvider>
      <App/>
    </ApolloAppProvider>
  )
}

export default PlayApp
