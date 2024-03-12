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

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser, setAuthenticated } = UseOutsider();
  const [logInPhase, setLogInPhase] = useState(true);

  const [signUp] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      setLogInPhase(true);
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
      setUser({ userId, account, name });
      setAuthenticated(true);
      displayStatus({ type: "success", msg: "Log in successfully" });
      navigate(paths.MAIN);
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    }
  });

  const LogInLayout = () => (
    <>
      <h1 className={styles.title}>Log In</h1>
      <LoginForm handleLogin={login} />
      <div className={styles.footer}>
        Do not have an account?{" "}
        <span
          className={styles.signInLink}
          onClick={() => setLogInPhase(false)}
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
        <span className={styles.signInLink} onClick={() => setLogInPhase(true)}>
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
        {logInPhase ? <LogInLayout /> : <SignUpLayout />}
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error logging in. Please try again.</p>} */}
    </div>
  );
};

export default SignInPage;