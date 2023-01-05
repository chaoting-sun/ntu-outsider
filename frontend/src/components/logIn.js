import { Button, Space, Input } from 'antd';
import { useState } from 'react';
import '../css/signIn.css';
import { useOusider } from '../containers/hooks/useOusider';
// import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  formButton: {
    color: "white",
    fontWeight: '600',
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    textAlign: "center",
  }
});

// antd - Space
// ref: https://ant.design/components/space

const LogIn = ({ handleLogIn }) => {
  const titleStyles = useStyles();
  const { displayStatus } = useOusider();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        className='signInInput'
        value={account}
        placeholder='account'
        onChange={(e) => setAccount(e.target.value)}
        style={{
          width: '80%',
          height: '49px',
          fontSize: '1.3em'
        }}
      />
      <Input
        className='signInInput'
        value={password}
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '80%',
          height: '49px',
          fontSize: '1.3em',
        }}
      />
      <div style={{height: '15px', width: '20px'}}></div>
      <Button
        type="primary"
        className="signInInput"
        style={{
          backgroundColor: '#787b7d',
          fontSize: '2em',
          width: '80%',
          height: '60px',
        }}
        onClick={async () => {
          if (account === "") {
            displayStatus({
              'type': 'fail',
              'msg': 'Please enter account!'
            })
            return;
          } else if (password === "") {
            displayStatus({
              'type': 'fail',
              'msg': 'Please enter password!'
            })
            return;
          }

          await handleLogIn({ inAccount: account, inPassword: password })
          setAccount("");
          setPassword("");
        }}
      >
        <Typography
          variant="h4"
          className={titleStyles.formButton}
        >
          Log In
        </Typography>
      </Button>
    </>
  )

}

export default LogIn;