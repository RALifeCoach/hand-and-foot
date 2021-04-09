import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import MainProvider from "./App/MainProvider";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function buildConfig() {
  const serverHost = process.env.REACT_APP_SERVER_HOST
    ? `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    : 'localhost:3010'
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
