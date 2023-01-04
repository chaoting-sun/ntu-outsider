import { Space, Button, Input } from 'antd';
import { useState } from 'react';
import '../css/signIn.css';

// antd - Space
// ref: https://ant.design/components/space

const LogIn = ({ handleLogIn }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='LogInFormWrapper'>
      <Space direction='vertical' size='large'>
        <Input
          value={account}
          placeholder='account'
          onChange={(e) => setAccount(e.target.value)}
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
          value={password}
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
          style={{
            backgroundColor: '#787b7d',
            fontSize: '2em',
            width: '360px',
            height: '60px'
          }}
          onClick={async () => {
            await handleLogIn({ inAccount: account, inPassword: password })
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