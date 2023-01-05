import { Button, Space, Input } from 'antd';
import { useState } from 'react';
import '../css/signIn.css';
import { useOusider } from '../containers/hooks/useOusider';
// import Button from '@material-ui/core/Button';
import styled from 'styled-components';


// antd - Space
// ref: https://ant.design/components/space

const LogIn = ({ handleLogIn }) => {
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

      <Button
        type="primary"
        className="signInInput"
        style={{
          backgroundColor: '#787b7d',
          fontSize: '2em',
          width: '80%',
          height: '60px'
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
        Log In
      </Button>
    </>
  )

}

export default LogIn;