import React from 'react'
import '../css/homePage.css'
import { posts } from '../db'
import { useOusider } from './hooks/useOusider'
import { Navigate } from "react-router-dom";



const HomePage = () => {
  const {  }=  useOusider();
  

  return (
    SignedIn ? (
      <div className='mainPageContainer'>
        <div>
          ergg
        </div>
      </div>
    ) : (
      <Navigate to="/signIn" />
      // <Navigate replace to="/login" />
    )
  )
}

export default HomePage