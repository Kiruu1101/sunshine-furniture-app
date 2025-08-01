import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
