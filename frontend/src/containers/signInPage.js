import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import LogIn from "../components/logIn"
// import Title from "../components/Title"
import { Navigate, useNavigate } from "react-router-dom";

const users = [{ username: "guest", password: "guest" }];

const SignInPage = () => {
  const { username, setUsername, password, setPassword,
    setAuthenticated, displayStatus } = useOusider();
  const navigate = useNavigate();

  const handleSubmit = (input) => {
    const account = users.find((user) => user.username === input.username);
    
    if (account && account.password === input.password) {
      setAuthenticated(true);
      localStorage.setItem("authenticated", true);
      
      setUsername(input.username);
      setPassword(input.password);

      displayStatus({
        type: "success",
        msg: "log in successfully",
      })

      navigate('/Home', {
        state: {
          test: 'test' 
        }
      })

    } else {
      displayStatus({
        type: "error",
        msg: "username or password is incorrect!",
      })
    }
  }

  const handleLogInOnFinish = (values) => {
    // triggered when the input format is correct (meet the rules)
    console.log('Input format is correct:', values);
    
    // check if the user is in the database
    handleSubmit(values);
  };

  const handleLogInOnFinishFailed = (errorInfo) => {
    // triggered when the input format is incorrect
    console.log('Input format is :', errorInfo);
  };

  console.log('enter signInPage component');

  return (
    <>
      <LogIn
        onFinish={handleLogInOnFinish}
        onFinishFailed={handleLogInOnFinishFailed}
      />

      {/* <div>
        <p>Welcome Back</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div> */}
    </>
  )
}

export default SignInPage;