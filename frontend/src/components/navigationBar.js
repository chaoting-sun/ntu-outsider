import React from 'react'
import { useState, useEffect } from "react";
import '../css/navigationBar.css'
import Filter from './filter';
import { MdTune, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router-dom';
import { useOusider } from '../containers/hooks/useOusider';
import MenuBar from '../components/menuBar'
import HeaderBar from '../components/headerBar'


const NavBar = () => {
  console.log("render NavBar...");
  const { authenticated, postInfo } = useOusider();
  const [currentPage, setCurrentPage] = useState("MainPage");
  // const [] = 
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect: queryPostInfo");
    queryPostInfo(currentPage);
  }, [currentPage])

  const queryPostInfo = (currentPage) => {
    
  }

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

    const keyToPage = {
      "savedPost": "savedPostPage",
      "following": "followedPostPage",
      "application": "applyPostPage",
      "myPost": "myPostPage"
    }    
    setCurrentPage(keyToPage[key]);
    setCurrentPage(`/${keyToPage[key]}`);
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