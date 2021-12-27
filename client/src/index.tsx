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

function buildConfig() {
  const serverHost = window.location.host
  return {
    API_URL: `http://${serverHost}`,
    WS_URL: `ws://${serverHost}`,
  }
}

const initializeState = ({set}: MutableSnapshot) => {
  set(configAtom, buildConfig())
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot initializeState={initializeState}>
          <App/>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
