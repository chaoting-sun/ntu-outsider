import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
// import Title from "../components/Title"
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";


const users = [{ username: "guest", password: "guest" }];
const passwordEncryption = { 'guest': 'guest12345678' }


const SignInPage = () => {
  const { username, setUsername,
    setAuthenticated, displayStatus, setUserId } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

  }, [signUp])

  const handleLogIn = ({ inputUserName, inputPassword }) => {
    const encryptedPassword = passwordEncryption[inputUserName]
    /**TODO:
     * db <- query(inputUserName, encryptedPassword)
     * db -> exist ? basic info : null
     */
    const accountName = users.find((user) => user.username === inputUserName);
    const accountId = 'guest12345678'

    if (accountId) {
      setAuthenticated(true);
      localStorage.setItem("authenticated", true);

      setUserId(accountId)
      setUsername(inputUserName);

      displayStatus({
        type: "success",
        msg: "log in successfully",
      })

      navigate('/') // HomePage

    } else {
      displayStatus({
        type: "error",
        msg: "username or password is incorrect!",
      })
    }
  }

  const handleSignUp = ({inputUserName, inputUserAccount, inputPassword}) => {
    /**TODO:
     * 
     * mutation(inputUserName, inputUserAccount, inputPassword)
     */
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