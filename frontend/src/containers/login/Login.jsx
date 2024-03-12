import { useState } from "react";
import LoginForm from "../../components/signInForm/loginForm";
import { LOGIN_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { displayStatus } from "../utils";
import styles from "./login.module.css";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: { account, password },
    onCompleted: ({ login }) => {
      if (login.__typename === "AuthPayload") {
        

        const { token, userId, account, name } = login;

      } else if (login.__typename === "ValidationError") {
        displayStatus({ type: "error", msg: login.report });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleLogin(account, password);
  };

  const handleLogin = async (account, password) => {
    // console.log("handleLogin:", account, password);

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <input
          name="email"
          type="email"
          placeholder="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.submit} type="submit">
        SIGN IN
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
};

export default Login;
