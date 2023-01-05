import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useOusider } from '../containers/hooks/useOusider';
import HeaderBar from '../components/headerBar'
import MenuBar from '../components/menuBar'
import '../css/navigationBar.css'


const NavBar = () => {
  const { authenticated, displayStatus, setAuthenticated,
    handleQueryPost, handleQueryPostCollection } = useOusider();
  const navigate = useNavigate();

  const handleOnClickMail = () => {
    if (authenticated) {
      navigate("/mailPage");
    } else {
      navigate("/logIn");
    }
  }

  const handleOnClickLogInOut = (action) => {
    // logIn or logOut
    switch (action) {
      case "logIn":
        navigate("/logIn", { state: { signUp: false}});
        break;
      case "logOut":
        setAuthenticated(false);
        navigate("/logIn", { state: { signUp: false}});
        break;
      case "signUp":
        navigate("/logIn", { state: { signUp: true}});
        break;
      case "editProfile":
        navigate("/myProfilePage");
        break;
      default:
        console.log("wrong option");
    }
  }

  const handleMenuOperation = (key) => {
    console.log('menu operation:', key);

    if (!authenticated) {
      displayStatus({
        type: 'error',
        msg: 'Please log in!'
      })
      navigate("/logIn")
      return;
    } 
    
    if (key === 'editPost') {
      navigate(`/editPostPage`, {
        state: {
          action: 'createPost',
          post: null
        }
      })
    } else {
      // key = savedPost, followedPost, myPost, all
      handleQueryPostCollection(key);
      navigate("/");
    }
  }

  return (
    <>
      <HeaderBar
        authenticated={authenticated}
        handleOnClickMail={handleOnClickMail}
        handleOnClickLogInOut={handleOnClickLogInOut}
      />
      <MenuBar
        handleQueryPost={handleQueryPost}
        handleMenuOperation={handleMenuOperation}
      />
      <Outlet />
    </>
  )
}
export default NavBar