import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import AuthContext from './store/AuthContext.jsx'
import Post from './store/PostContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthContext>
    <Post>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
    </Post>
   </AuthContext>

  </React.StrictMode>,
)
