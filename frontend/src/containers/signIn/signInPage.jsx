import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import paths from "../../constants/paths";
import { UseOutsider } from "../hooks/useOutsider";
import RegisterForm from "../../components/signInForm/registerForm";
import LogInForm from "../../components/signInForm/logInForm";
import { displayStatus } from "../utils";

import { USER_QUERY } from "../graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "../graphql/mutation";

import styles from "./signInPage.module.css";
import { Button } from "@mui/material";

const SignInPage = () => {
  const navigate = useNavigate();
  const { handleAuthenticated } = UseOutsider();
  const [logInPhase, setLogInPhase] = useState(true);
  const [queryUser, { loading, error }] = useLazyQuery(USER_QUERY);
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);

  const handleLogIn = async (account, password) => {
    // console.log("handleLogIn:", account, password);

    try {
      const {
        data: { queryUser: response },
      } = await queryUser({ variables: { account, password } });

      if (response.__typename === "User") {
        const { _id, account, name } = response;
        handleAuthenticated(_id, account, name);
        displayStatus({ type: "success", msg: "Log in successfully" });
        navigate(paths.MAIN);
      } else {
        displayStatus({ type: "error", msg: response.report });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (account, name, password) => {
    // console.log("handleRegister:", account, name, password);

    try {
      const {
        data: { createAccount: response },
      } = await createAccount({
        variables: { account, name, password },
      });
      console.log("res:", response);

      if (response.__typename === "User") {
        displayStatus({ type: "success", msg: "Register successfully!" });
        setLogInPhase(true);
      } else {
        displayStatus({ type: "error", msg: response.report });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LogInLayout = () => (
    <>
      <h1 className={styles.title}>Log In</h1>
      <LogInForm handleLogIn={handleLogIn} />

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
      <RegisterForm handleRegister={handleRegister} />
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
      {loading && <p>Loading...</p>}
      {error && <p>Error logging in. Please try again.</p>}
    </div>
  );
};

export default SignInPage;
