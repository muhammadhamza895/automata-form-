import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// CONTEXT
import FIlesTypeContext from './context/FIlesTypeContext.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FIlesTypeContext>
      <App />
      <ToastContainer />
    </FIlesTypeContext>

  </React.StrictMode>,
)
