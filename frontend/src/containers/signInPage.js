import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css"
import LogIn from "../components/logIn"
import SignUp from "../components/signUp";
// import Title from "../components/Title"
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";


const users = [{ username: "guest", password: "guest" }];

const SignInPage = () => {
  const { username, setUsername, setPassword,
    setAuthenticated, displayStatus } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

  }, [signUp])

  const handleLogIn = ({ inputUserName, inputPassword }) => {
    // check if there exists the user in the database
    const account = users.find((user) => user.username === inputUserName);
    const userId = 'guest12345678'

    if (account && account.password === inputPassword) {
      setAuthenticated(true);
      localStorage.setItem("authenticated", true);

      setUsername(inputUserName);
      setPassword(inputPassword);

      displayStatus({
        type: "success",
        msg: "log in successfully",
      })

      // if confirmed, log in to the HomePage
      navigate('/')

    } else {
      displayStatus({
        type: "error",
        msg: "username or password is incorrect!",
      })
    }
  }

  console.log('enter signInPage component');

  return (
    <div className="mainContainer">
      <div className="leftMainContainer">
        <div className="brandName1">NTU</div>
        <div className="brandName2">OUTSIDER</div>
      </div>
      <div className="rightMainContainer">
        <div className="Form">
          {
            signUp ? (
              <div>
                

              </div>
            ) : (
              <>
                <div className="logInHeader">Log In</div>
                <LogIn handleLogIn={handleLogIn} />
                <div className='signUpRemind'>Do not have an account?
                  <span onClick={() => setSignUp(true)}>Sign up</span>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )

}

export default SignInPage;