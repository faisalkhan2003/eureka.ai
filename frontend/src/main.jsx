import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import { SignupPage } from './pages/Signup.jsx'
import { LoginPage } from './pages/Login.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import ResearchPage from './pages/ResearchPage.jsx'
import { ChatbotUI } from './components/ChatbotUI.jsx'
import { ResearchGuideUI } from './components/ResearchGuideUI.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Homepage/>
      },
      {
        path:'/signup',
        element:<SignupPage/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/research',
        element:<ProtectedRoute><ResearchPage/></ProtectedRoute>,
        children:[
          {
            path:'/research/chatbot',
            element:<ChatbotUI/>
          },
          {
            path:'/research/guide',
            element:<ResearchGuideUI/>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
