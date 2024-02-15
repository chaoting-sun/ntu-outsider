import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useOusider } from "../containers/hooks/useOusider";
import HeaderBar from "./headerBar";
import MenuBar from "./menuBar";
import PathConstants from "../routes/pathConstants";
import "../css/navigationBar.css";

const NavBar = () => {
  const {
    authenticated,
    displayStatus,
    setAuthenticated,
    handleQueryPost,
    handleQueryPostCollection,
  } = useOusider();
  const navigate = useNavigate();

  const handleOnClickMail = () => {
    if (authenticated) {
      navigate(PathConstants.MAIL);
    } else {
      navigate(PathConstants.LOGIN);
    }
  };

  const handleOnClickLogInOut = (action) => {
    // logIn or logOut
    switch (action) {
      case "logIn":
        navigate(PathConstants.LOGIN, { state: { signUp: false } });
        break;
      case "logOut":
        setAuthenticated(false);
        navigate(PathConstants.LOGIN, { state: { signUp: false } });
        break;
      case "signUp":
        navigate(PathConstants.LOGIN, { state: { signUp: true } });
        break;
      case "editProfile":
        navigate(PathConstants.MY_PROFILE);
        break;
      default:
        console.log("wrong option");
    }
  };

  const handleMenuOperation = (key) => {
    // console.log('menu operation:', key);

    if (!authenticated) {
      displayStatus({
        type: "error",
        msg: "Please log in!",
      });
      navigate(PathConstants.LOGIN);
      return;
    }

    if (key === "editPost") {
      navigate(PathConstants.EDIT_POST, {
        state: {
          action: "createPost",
          post: null,
        },
      });
    } else {
      // key = savedPost, followedPost, myPost, all
      handleQueryPostCollection(key);
      navigate(PathConstants.MAIN);
    }
  };

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
  );
};
export default NavBar;
