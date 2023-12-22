import React from 'react'
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './application/index';
import { BrowserRouter} from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
