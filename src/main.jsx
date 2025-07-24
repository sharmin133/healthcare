import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Layout/Root.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import Login from './Components/Pages/UserInformation/Login.jsx';
import UserProfile from './Components/Pages/UserInformation/UserProfile.jsx';
import Register from './Components/Pages/UserInformation/Register.jsx';
import AuthProvider from './Components/Context/AuthProvider.jsx';
import VerifyEmail from './Components/Pages/UserInformation/VerifyEmail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root> ,
    children:[
      {
        index:true, element: <Home></Home>
      },

      {
        path:'login', element: <Login></Login>
      },
      {
        path:'register', element:<Register></Register>
      },
      {
        path:'profile', element: <UserProfile></UserProfile>
      },
    

    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
