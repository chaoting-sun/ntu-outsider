import React from 'react'
import { useState } from "react";
import '../css/navigationBar.css'
import Filter from './filter';
import { MdTune, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useOusider } from '../containers/hooks/useOusider';
import MenuBar from '../components/menuBar'
import HeaderBar from '../components/headerBar'



const NavBar = () => {
  const { authenticated } = useOusider();
  const navigate = useNavigate();

  const handleSearchInfo = ({ option, content }) => {
    console.log('option:', option);
    console.log('content:', content);
  }

  // const items = [
  //   { label: "珍藏", key: "savedPost" },
  //   { label: "追蹤", key: "following" },
  //   { label: "申請", key: "application" },
  //   { label: "我的貼文", key: "myPost" },
  // ]

  const handleMenuNavigate = (key) => {
    if (key === "savedPost") {
      console.log("navigate to /savedPostPage");
      navigate("/savedPostPage")

    } else if (key === "following") {
      console.log("navigate to /followedPostPage");
      navigate("/followedPostPage")

    } else if (key === "application") {
      console.log("navigate to /applyPostPage");
      navigate("/applyPostPage")

    } else if (key === "myPost") {
      console.log("navigate to /myPostPage");
      navigate("/myPostPage")
    }
  }

  return (
  
      <>
        <HeaderBar />
        <MenuBar
          handleSearchInfo={handleSearchInfo}
          handleMenuNavigate={handleMenuNavigate}
        />
      </>
     
  )
}
export default NavBar