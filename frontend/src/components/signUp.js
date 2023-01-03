import { Space, Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components'
import React, { useState } from 'react'
import '../css/signIn.css'


// antd - Space
// ref: https://ant.design/components/space

const SignUp = ({ handleSignUp }) => {
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='LogInFormWrapper'>
      <Space direction='vertical' size='large'>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='username'
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder='account'
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          type='password'
          style={{
            fontSize: '1.3em',
            width: '360px',
            height: '49px',
          }}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: '#787b7d',
            fontSize: '1.6em',
            width: '360px',
            height: '50px'
          }}
          onClick={async () => {
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
      </Space>
    </div>
  )
}

export default SignUp;