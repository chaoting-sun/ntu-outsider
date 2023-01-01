import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components'
import '../css/signIn.css'


// const LogInFormWrapper = styled.div`
//   border-color: 
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
// `

// ref: https://ant.design/components/form
// should add validateMessages
const LogIn = ({ onFinish, onFinishFailed }) => {
  return (
    <div className='LogInFormWrapper'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          colon={false}
          style={{
            // width: '350px',
            fontSize: '3em',
            fontWeight: 500
          }}
          // rules={[{ required: true, message: 'Please input your username!',},]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          colon={false}
          // rules={[{ required: true, message: 'Please input your password!',}, ]}
        >
          <Input.Password />
        </Form.Item>

        {/* the "Remember me" button */}
        <Form.Item
          name="remember"
          valuePropName="checked"
          // wrapperCol={{ offset: 8, span: 16, }}
        >
        </Form.Item>

        <Form.Item
          // wrapperCol={{ offset: 8, span: 16, }}
        >
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LogIn;