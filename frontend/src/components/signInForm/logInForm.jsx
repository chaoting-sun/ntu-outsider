import { useState } from "react";
import styles from "./signInForm.module.css";
import PropTypes from "prop-types";

const LogInForm = ({ handleLogIn }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleLogIn(account, password);
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

LogInForm.propTypes = {
  handleLogIn: PropTypes.func,
};


export default LogInForm;

