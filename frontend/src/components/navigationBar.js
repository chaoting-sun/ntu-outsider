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

  const handleOnClickMail = () => {
    navigate("/mailPage")
  }

  const handleOnClickLogInOut = (action) => {
    // logIn or logOut
    console.log("action:", action);

    switch (action) {
      case "logIn":
        navigate("/logIn", { state: { signUp: false}});
        break;
      case "logOut":
        navigate("/logIn", { state: { signUp: false}});
        break;
      case "signUp":
        navigate("/logIn", { state: { signUp: true}});
        break;
      case "editProfile":
        navigate("/myProfilePage");
        break;
      default:
        console.log("only logIn | logOut | editProfile:", action);
    }
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

    if (page === 'editPostPage') {
      navigate(`/${page}`, {
        state: {
          action: 'createPost',
          post: null
        }
      });
    } else {
      navigate(`/${page}`);
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
        handleConditionedSearch={handleConditionedSearch}
        handleMenuNavigate={handleMenuNavigate}
      />
      <Outlet />
    </>
  )
}
export default NavBar