import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
// import Title from "../components/Title"
import { useNavigate, Link } from "react-router-dom";
import { hashPassword } from "../utils/hash"
import { useEffect, useState } from "react";
import { userExamples } from "./db";


const queryUser = async (inAccount, inPassword) => {
  // graphql - query
  // inPassword should be the hashed password
  const user = userExamples.find(({ account, password }) =>
    inAccount === account && inPassword === password)
  if (user !== undefined)
    return user;
  return null;
}

const createAccount = async (inAccount, inUserName, inPassword) => {
  // graphql - query
  // inPassword should be the hashed password
  return {
    userId: 5,
    account: inAccount,
    userName: inUserName,
    password: inPassword,
  }
}

const SignInPage = () => {
  const { account, setAccount, username, setUsername,
    setAuthenticated, displayStatus, setUserId } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const autheticateAccount = (user) => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", true);

    setUserId(user.userId)
    setAccount(user.account)
    setUsername(user.username);

    displayStatus({
      type: "success",
      msg: "log in successfully",
    })
    navigate('/') // HomePage
  }

  const handleLogIn = async ({ inAccount, inPassword }) => {
    const user = await queryUser(inAccount, inPassword);

    if (user) {
      autheticateAccount(user);
    } else {
      displayStatus({
        type: "error",
        msg: "Account or password is incorrect!",
      })
    }
  }

  const handleSignUp = async ({ inAccount, inUserName, inPassword }) => {
    const hashedPassword = hashPassword(inPassword)
    const user = await queryUser(inAccount, hashedPassword);

    createAccount(inAccount, inUserName, inPassword);

    if (user) {
      autheticateAccount(user);
    } else {
      displayStatus({
        type: "error",
        msg: "account saved error!"
      })
    }
  }

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
              <>
                <div className="SignUpHeader">Sign Up</div>
                <SignUp handleSignUp={handleSignUp} />
              </>
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