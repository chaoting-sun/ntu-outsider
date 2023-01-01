import { Space, Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components'
import '../css/signIn.css'
import { useState } from 'react';


// antd - Space
// ref: https://ant.design/components/space

const LogIn = ({ handleLogIn }) => {
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  return (
    <div className='LogInFormWrapper'>
      <Space direction='vertical' size='large'>
        <Input
          placeholder='username'
          onChange={(e) => setInputUserName(e.target.value)}
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
          placeholder='password'
          type='password'
          onChange={(e) => setInputPassword(e.target.value)}
          style={{
            fontSize: '1.3em',
            width: '360px',
            height: '49px',
          }}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: '#787b7d',
            fontSize: '2em',
            width: '360px',
            height: '60px'
          }}
          onClick={() => {
            handleLogIn({
              inputUserName: inputUserName,
              inputPassword: inputPassword
            })
          }}
        >
          Log In
        </Button>
      </Space>
    </div>
  )
}

export default LogIn;