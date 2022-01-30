import React from 'react'
import App from '../App/App'
import ApolloAppProvider from '../App/ApolloAppProvider'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { configAtom } from '../atoms/main'

const PlayApp = () => {
  return (
    <ApolloAppProvider>
      <App/>
    </ApolloAppProvider>
  )
}

export default PlayApp
