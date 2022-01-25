import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import * as serviceWorker from './serviceWorker'
import {ThemeProvider} from '@mui/material'
import theme from './theme'
import {MutableSnapshot, RecoilRoot} from 'recoil'
import {configAtom} from './atoms/main'
import {BrowserRouter} from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, createHttpLink
} from '@apollo/client'

function buildConfig() {
  const serverHost = window.location.host
  console.log('server host', serverHost)
  return {
    API_URL: `http://${serverHost}`,
    WS_URL: `ws://${serverHost}`,
  }
}
const serverHost = window.location.host
const link = createHttpLink({
  uri: `http://${serverHost}/api/v1/graphql`,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const initializeState = ({set}: MutableSnapshot) => {
  set(configAtom, buildConfig())
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <RecoilRoot initializeState={initializeState}>
            <App/>
          </RecoilRoot>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
