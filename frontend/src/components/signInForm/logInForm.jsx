import { useState } from "react";
import styles from "./signInForm.module.css";
import PropTypes from "prop-types";

// TODO: prevent the inputs from being removed when the form is submitted

const LoginForm = ({ handleLogin }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ variables: { account, password } });
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

export default LoginForm;
