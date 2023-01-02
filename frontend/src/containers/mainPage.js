import React from 'react'
import '../css/mainPage.css'
import { posts } from '../db'
import { useOusider } from './hooks/useOusider'
import { useNavigate } from 'react-router-dom'
// import NavBar from '../components/navigationBar'
import MenuBar from '../components/menuBar'
import HeaderBar from '../components/headerBar'
import PrimaryLayout from '../components/primaryLayout'
import MainLayout from '../components/mainLayout'

import styled from 'styled-components'

import '../css/primaryLayout.css'


const OverallLayout = styled.div`
  background-color: white;
  flex-direction: row;
`

const MainPage = () => {
  const { authenticated }=  useOusider();
  const navigate = useNavigate()


  console.log('authenticated? :', authenticated);


  const handleLogIn = () => {
    console.log("Navigate to page /logIn...");
    navigate("/logIn")
  }

  return (
    authenticated ? (
      <>
        <div className="mainPageContainer">
          here is MainPage
        </div>      
      </>
    ) : (
      <>
        <div>
          <div>Please log in to the page</div>
          <button onClick={handleLogIn}>Click me</button>
        </div>
      </>
    )
  )
}





export default MainPage