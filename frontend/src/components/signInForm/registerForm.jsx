import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./signInForm.module.css";

// TODO: prevent the inputs from being removed when the form is submitted

const RegisterForm = ({ handleRegister }) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleRegister({ variables: { account, name, password } });
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
          name="username"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        SIGN UP
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
};

export default RegisterForm;
