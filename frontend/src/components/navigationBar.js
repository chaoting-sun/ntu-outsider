import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useOusider } from '../containers/hooks/useOusider';
import HeaderBar from '../components/headerBar'
import MenuBar from '../components/menuBar'
import '../css/navigationBar.css'


const keyToPage = {
  "savedPost": "savedPostPage",
  "followedPost": "followedPostPage",
  "appliedPost": "appliedPostPage", // 沒了
  "myPost": "myPostPage"
}

const NavBar = () => {
  const { authenticated, postInfo, setCurrentPost } = useOusider();
  const navigate = useNavigate();

  const handleSearchInfo = ({ option, content }) => {
    console.log('option:', option);
    console.log('content:', content);
  }

  const handleOnClickLogInOut = () => {
    // logIn or logOut
    navigate("/logIn")
  }

  const handleMenuNavigate = (key) => {
    if (!authenticated) {
      navigate("/logIn")
      return;
    } 

    setCurrentPost(keyToPage[key]);
    navigate(`/${keyToPage[key]}`);
  }

  return (
    <>
      <HeaderBar
        authenticated={authenticated} 
        handleOnClickLogInOut={handleOnClickLogInOut}
      />
      <MenuBar
        handleSearchInfo={handleSearchInfo}
        handleMenuNavigate={handleMenuNavigate}
      />
      <Outlet />
    </>
  )
}
export default NavBar