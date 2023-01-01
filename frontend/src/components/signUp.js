import { Space, Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styled from 'styled-components'
import '../css/signIn.css'


// antd - Space
// ref: https://ant.design/components/space

const SignUp = ({ onFinish, onFinishFailed }) => {
  return (
    <div className='LogInFormWrapper'>
      <Space direction='vertical' size='large'>
        <Input
          placeholder='username'
          style={{
            width: '360px',
            height: '49px',
            fontSize: '1.3em'
          }}
        />
        <Input
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
          htmlType="submit"
          style={{
            backgroundColor: '#787b7d',
            fontSize: '2em',
            width: '360px',
            height: '60px'
          }}
        >
          Log In
        </Button>
      </Space>
    </div>
  )
}

export default SignUp;