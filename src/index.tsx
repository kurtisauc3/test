import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './core/network/Provider';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import RoobertMedium from './assets/fonts/Roobert-Medium.woff2';
import RoobertRegular from './assets/fonts/Roobert-Regular.woff2';
import RoobertSemiBold from './assets/fonts/Roobert-SemiBold.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roobert';
    src: url(${RoobertRegular}) format('woff2');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Roobert';
    src: url(${RoobertMedium}) format('woff2');
    font-weight: 500;
  }
  @font-face {
    font-family: 'Roobert';
    src: url(${RoobertSemiBold}) format('woff2');
    font-weight: 600;
  }
  * {
    font-family: Roobert, "Times New Roman", "Open Sans", "Helvetica Neue", sans-serif;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f8f6eb;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
