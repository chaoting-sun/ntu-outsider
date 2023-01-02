import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useOusider } from '../containers/hooks/useOusider';
import HeaderBar from '../components/headerBar'
import MenuBar from '../components/menuBar'
import '../css/navigationBar.css'


const NavBar = () => {
  const { authenticated, postInfo, 
    displayStatus } = useOusider();
  const navigate = useNavigate();

  const handleOnClickLogInOut = () => {
    // logIn or logOut
    navigate("/logIn")
  }

  const handleConditionedSearch = ({ type, queryString }) => {
    navigate("/searchPostPage", {
      state: {
        type: type,
        queryString: queryString
      }
    })    
  }

  const handleMenuNavigate = (page) => {
    if (!authenticated) {
      displayStatus({
        type: 'error',
        msg: 'Please log in!'
      })
      navigate("/logIn")
      return;
    }
    navigate(`/${page}`);
  }

  return (
    <>
      <HeaderBar
        authenticated={authenticated}
        handleOnClickLogInOut={handleOnClickLogInOut}
      />
      <MenuBar
        handleConditionedSearch={handleConditionedSearch}
        handleMenuNavigate={handleMenuNavigate}
      />
      <Outlet />
    </>
  )
}
export default NavBar