import { useState } from "react";
import styles from "./signInForm.module.css";
import { Button } from "@mui/material";
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
          type="email"
          placeholder="Account"
          name="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          margin: "15px 0",
          width: "100%",
          bgcolor: "#383838",
          "&:hover": { bgcolor: "#383838" },
        }}
        type="submit"
      >
        SIGN IN
      </Button>
    </form>
  );
};

LogInForm.propTypes = {
  handleLogIn: PropTypes.func,
};


export default LogInForm;

