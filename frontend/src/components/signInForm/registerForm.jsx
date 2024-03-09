import { useState } from "react";
import PropTypes from "./prop-types";
import styles from "./signInForm.module.css";

const RegisterForm = ({ handleRegister }) => {
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleRegister(account, username, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <input
          type="email"
          placeholder="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.submit} type="submit">
        SIGN UP
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
};

export default RegisterForm;
