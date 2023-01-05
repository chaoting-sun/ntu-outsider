import { Space, Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components'
import React, { useState } from 'react'
import '../css/signIn.css'
import { useOusider } from '../containers/hooks/useOusider';


// antd - Space
// ref: https://ant.design/components/space

const SignUp = ({ handleSignUp }) => {
  const { displayStatus } = useOusider();
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        value={userName}
        className='signInInput'
        onChange={(e) => setUserName(e.target.value)}
        placeholder='username'
        style={{
          width: '80%',
          height: '49px',
          fontSize: '1.3em'
        }}
      />
      <Input
        value={account}
        className='signInInput'
        onChange={(e) => setAccount(e.target.value)}
        placeholder='account'
        style={{
          width: '80%',
          height: '49px',
          fontSize: '1.3em'
        }}
      />
      <Input
        value={password}
        className='signInInput'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
        type='password'
        style={{
          fontSize: '1.3em',
          width: '80%',
          height: '49px',
        }}
      />
      <Button
        type="primary"
        className='signInInput'
        style={{
          backgroundColor: '#787b7d',
          fontSize: '1.6em',
          width: '80%',
          height: '50px'
        }}
        onClick={async () => {
          if (userName === "") {
            displayStatus({
              'type': 'fail',
              'msg': 'Please enter username!'
            })
            return;
          } else if (account === "") {
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

          await handleSignUp({
            inAccount: account,
            inUserName: userName,
            inPassword: password
          })
          setUserName("");
          setAccount("");
          setPassword("");
        }}
      >
        Sign Up
      </Button>
    </>
  )
}

export default SignUp;