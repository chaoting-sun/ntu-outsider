import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UseOutsider } from "../hooks/useOutsider";
import paths from "../../constants/paths";
import MiniDrawer from "./miniDrawer";
import actions from "../../constants/actions";
import { displayStatus } from "../utils";

const NavBar = () => {
  const { authenticated, setAuthenticated } = UseOutsider();

  const navigate = useNavigate();

  const handleOnClickMail = () => {
    if (authenticated) {
      navigate(paths.MAIL);
    } else {
      navigate(paths.LOGIN);
    }
  };

  const handleOnClickLogInOut = (action) => {
    // logIn or logOut
    switch (action) {
      case "logIn":
        navigate(paths.LOGIN, { state: { signUp: false } });
        break;
      case "logOut":
        setAuthenticated(false);
        navigate(paths.LOGIN, { state: { signUp: false } });
        break;
      case "signUp":
        navigate(paths.LOGIN, { state: { signUp: true } });
        break;
      case "editProfile":
        navigate(paths.MY_PROFILE);
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
      navigate(paths.LOGIN);
      return;
    }

    if (key === actions.EDIT_POST) {
      navigate(paths.EDIT_POST, {
        state: {
          action: "createPost",
          post: null,
        },
      });
    } else {
      // key = savedPost, followedPost, myPost, all
      handleQueryPostCollection(key);
      navigate(paths.MAIN);
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
