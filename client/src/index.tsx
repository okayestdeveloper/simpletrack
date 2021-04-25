import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../styles/tailwind.css';
import '../styles/bulma.css';
import '../styles/index.css';
import App from './App';

// NOTE: do not put any layout here. This file is for main app configuration.
// Main layout and routing configuration is in App.tsx

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
