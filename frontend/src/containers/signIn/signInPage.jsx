import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

import PathConstants from "../../routes/pathConstants";
import { useOutsider } from "../hooks/useOutsider";
import RegisterForm from "../../components/signInForm/registerForm";
import LogInForm from "../../components/signInForm/logInForm";

import { USER_QUERY } from "../graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "../graphql/mutation";

import styles from "./signInPage.module.css";
import { Button } from "@mui/material";

// import SignUp from "../../components/signUp";
// import Typography from "@mui/material/Typography";

const SignInPage = () => {
  const { displayStatus, autheticateAccount } = useOutsider();
  const [signUp, setSignUp] = useState(false);
  const [queryUser] = useLazyQuery(USER_QUERY, { fetchPolicy: "network-only" });
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setSignUp(location.state.signUp);
    }
  }, [location.state]);

  const handleLogIn = async (account, password) => {
    const { data } = await queryUser({ variables: { account, password } });

    if (data.queryUser) {
      autheticateAccount(data.queryUser);
      displayStatus({
        type: "success",
        msg: "log in successfully",
      });
      navigate(PathConstants.MAIN);
    } else {
      displayStatus({
        type: "error",
        msg: "Account or password is incorrect!",
      });
    }
  };

  const handleRegister = async (account, username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data } = await createAccount({
      variables: {
        account,
        name: username,
        password: hashedPassword,
      },
    });

    if (data.createAccount) {
      displayStatus({
        type: "success",
        msg: "sign up successfully!",
      });
      setSignUp(false);
    } else {
      displayStatus({
        type: "error",
        msg: "Account already exists!",
      });
    }
  };

  const LogInView = () => (
    <>
      <h1 className={styles.title}>Log In</h1>
      <LogInForm handleLogIn={handleLogIn} />

      <div className={styles.footer}>
        Do not have an account?{" "}
        <span className={styles.signInLink} onClick={() => setSignUp(true)}>
          Sign up.
        </span>
      </div>
    </>
  );

  const SignUpView = () => (
    <>
      <h1 className={styles.title}>Sign up</h1>
      <RegisterForm handleRegister={handleRegister} />
      <div className={styles.footer}>
        Already have an account?{" "}
        <span className={styles.signInLink} onClick={() => setSignUp(false)}>
          Log in.
        </span>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <Button
        className={styles.projectName}
        onClick={() => navigate(PathConstants.MAIN)}
      >
        NTU OUTSIDER
      </Button>
      <div className={styles.formContainer}>
        <LockOpenIcon sx={{ fontSize: "2.4rem" }} />
        {signUp ? <SignUpView /> : <LogInView />}
      </div>
    </div>
  );
};

export default SignInPage;
