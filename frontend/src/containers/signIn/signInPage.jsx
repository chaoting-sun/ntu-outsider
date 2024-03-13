import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import paths from "../../constants/paths";
import { UseOutsider } from "../hooks/useOutsider";
import RegisterForm from "../../components/signInForm/registerForm";
import LoginForm from "../../components/signInForm/loginForm";
import { displayStatus, parseErrorMessage } from "../utils";

import { USER_QUERY } from "../graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "../graphql/mutation";

import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../graphql/mutation";

import styles from "./signInPage.module.css";
import { Button } from "@mui/material";
import { AUTHENTICATED_KEY, USER_KEY } from "../../constants/localStorages";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const action = location.state?.action === "signUp" ? "signUp" : "login";

  const { setUser, setAuthenticated } = UseOutsider();
  const [loginPhase, setLoginPhase] = useState(action);

  const [signUp] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      setLoginPhase("login");
      displayStatus({ type: "success", msg: "Sign up successfully" });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      const { userId, account, name } = login;
      const loginUser = { userId, account, name };

      localStorage.setItem(USER_KEY, JSON.stringify(loginUser));
      localStorage.setItem(AUTHENTICATED_KEY, true);
      setUser(loginUser);
      setAuthenticated(true);

      displayStatus({ type: "success", msg: "Log in successfully" });
      navigate(paths.MAIN);
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

  const LogInLayout = () => (
    <>
      <h1 className={styles.title}>Log In</h1>
      <LoginForm handleLogin={login} />
      <div className={styles.footer}>
        Do not have an account?{" "}
        <span
          className={styles.signInLink}
          onClick={() => setLoginPhase("signUp")}
        >
          Sign up.
        </span>
      </div>
    </>
  );

  const SignUpLayout = () => (
    <>
      <h1 className={styles.title}>Sign up</h1>
      <RegisterForm handleRegister={signUp} />
      <div className={styles.footer}>
        Already have an account?{" "}
        <span className={styles.signInLink} onClick={() => setLoginPhase("login")}>
          Log in.
        </span>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <Button
        className={styles.projectName}
        onClick={() => navigate(paths.MAIN)}
      >
        NTU OUTSIDER
      </Button>
      <div className={styles.formContainer}>
        <LockOpenIcon sx={{ fontSize: "2.4rem" }} />
        {loginPhase === "login" ? <LogInLayout /> : <SignUpLayout />}
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error logging in. Please try again.</p>} */}
    </div>
  );
};

export default SignInPage;
