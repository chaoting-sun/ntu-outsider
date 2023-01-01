import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css"
import LogIn from "../components/logIn"
// import Title from "../components/Title"
import { useNavigate } from "react-router-dom";

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

      // if confirmed, log in to the HomePage
      navigate('/', {
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
    <div className="mainContainer">
      {console.log("render SignInPage...")}
      <div className="leftMainContainer">
      </div>
      <div className="rightMainContainer">
        <div className="logInForm">


        </div>
        <LogIn
          onFinish={handleLogInOnFinish}
          onFinishFailed={handleLogInOnFinishFailed}
        />
      </div>

      {/* <LogIn
        onFinish={handleLogInOnFinish}
        onFinishFailed={handleLogInOnFinishFailed}
      /> */}
    </div>
  )
}

export default SignInPage;