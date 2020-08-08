import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import MainProvider from "./App/MainProvider";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function buildConfig() {
  debugger;
  const domain = window.location.host;
  const [host] = domain.split(':');
  const serverHost = host === 'localhost'
    ? host + ':3010'
    : 'handf-server.' + host.split('.').slice(1).join('.');
  const config = {
    API_URL: `http://${serverHost}`,
    WS_URL: `ws://${serverHost}`,
  };
  console.log('config', config);
  return config;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainProvider
        config={buildConfig()}
      >
        <App />
      </MainProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
