import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import MainProvider from "./App/MainProvider";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

// @ts-ignore
const config = {
  API_URL: 'http://localhost:3010'
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainProvider
        config={config}
      >
        <App />
      </MainProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
