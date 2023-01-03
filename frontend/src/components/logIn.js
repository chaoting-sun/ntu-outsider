import { Space, Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components'
import '../css/signIn.css'
import { useState } from 'react';


// antd - Space
// ref: https://ant.design/components/space

const LogIn = ({ handleLogIn }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='LogInFormWrapper'>
      <Space direction='vertical' size='large'>
        <Input
          placeholder='account'
          onChange={(e) => setAccount(e.target.value)}
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
          placeholder='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          style={{
            fontSize: '1.3em',
            width: '360px',
            height: '49px',
          }}
        />

        <Button
          type="primary"
          // htmlType="submit"
          style={{
            backgroundColor: '#787b7d',
            fontSize: '2em',
            width: '360px',
            height: '60px'
          }}
          onClick={async () => {
            await handleLogIn({
              inAccount: account,
              inPassword: password
            })
            setAccount("");
            setPassword("");
          }}
        >
          Log In
        </Button>
      </Space>
    </div>
  )

}

export default LogIn;