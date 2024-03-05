import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useOutsider } from "../../containers/hooks/useOutsider";
import HeaderBar from "../headerBar";
import PathConstants from "../../routes/pathConstants";
// import styles from "../css/navBar.module.css";
import MiniDrawer from "./miniDrawer";

const NavBar = () => {
  const {
    authenticated,
    displayStatus,
    setAuthenticated,
    handleQueryPost,
    handleQueryPostCollection,
  } = useOutsider();
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
      {/* <HeaderBar
        authenticated={authenticated}
        handleOnClickMail={handleOnClickMail}
        handleOnClickLogInOut={handleOnClickLogInOut}
      /> */}

      {/* <HeaderBar authenticated={authenticated}>
      </HeaderBar> */}



      <MiniDrawer
        authenticated={authenticated}
        // handleQueryPost={handleQueryPost}
        // handleMenuOperation={handleMenuOperation}
      >
        <Outlet />
      </MiniDrawer>
    </>
  );
};
export default NavBar;
