import { Button, Space, Input } from "antd";
import { useState } from "react";
import "../css/signIn.css";
import { useOutsider } from "../containers/hooks/useOutsider";
// import Button from '@material-ui/core/Button';
// import { makeStyles } from "@material-ui/core/styles";
// import styled from 'styled-components';
import Typography from '@mui/material/Typography';

// antd - Space
// ref: https://ant.design/components/space

// const useStyles = makeStyles({
//   signInFormButton: {
//     color: "white",
//     userSelect: "none",
//   }
// });

const LogIn = ({ handleLogIn }) => {
  // const StylesClasses = useStyles();
  const { displayStatus } = useOutsider();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        className="signInInput"
        value={account}
        placeholder="account"
        onChange={(e) => setAccount(e.target.value)}
        style={{
          width: "80%",
          height: "49px",
          fontSize: "1.3em",
        }}
      />
      <Input
        className="signInInput"
        value={password}
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "80%",
          height: "49px",
          fontSize: "1.3em",
        }}
      />
      <div style={{ width: "20px", height: "15px" }}></div>
      <Button
        type="primary"
        className="signInInput"
        style={{
          backgroundColor: "#787b7d",
          fontSize: "2em",
          width: "80%",
          height: "60px",
        }}
        onClick={async () => {
          if (account === "") {
            displayStatus({
              type: "fail",
              msg: "Please enter account!",
            });
            return;
          } else if (password === "") {
            displayStatus({
              type: "fail",
              msg: "Please enter password!",
            });
            return;
          }

          await handleLogIn({ inAccount: account, inPassword: password });
          setAccount("");
          setPassword("");
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            userSelect: "none",
          }}
          // className={StylesClasses.signInFormButton}
        >
          Log In
        </Typography>
      </Button>
    </>
  );
};

export default LogIn;
