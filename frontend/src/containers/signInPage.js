import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
// import Title from "../components/Title"
import { useNavigate, Link, useLocation } from "react-router-dom";
import { hashPassword } from "../utils/hash"
import { useEffect, useState } from "react";
import { USER_QUERY } from "./graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "./graphql/mutation";


const SignInPage = () => {
  const { setAccount, setUsername,
    setAuthenticated, displayStatus, setUserId } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const [queryUser, { data, loading, error }] = useLazyQuery(USER_QUERY);
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const navigate = useNavigate();

  useEffect(() => {
    if (data === undefined) return;


    if (data !== null) {
      autheticateAccount(data);
    } else {
      displayStatus({
        type: "error",
        msg: "Account or password is incorrect!",
      })
    }
  }, [data, loading]);

  console.log();

  if (loading) return <p>Loading ...</p>;
  if (error) return <>Error! {error.message}</>;


  const autheticateAccount = (user) => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", true);

    setUserId(user._id)
    setAccount(user.account)
    setUsername(user.name);

    displayStatus({
      type: "success",
      msg: "log in successfully",
    })
    // navigate('/') // HomePage
  }

  const handleLogIn = async ({ inAccount, inPassword }) => {
    const hashedPassword = hashPassword(inPassword);

    console.log('queryUser input:\n', inAccount, hashedPassword)
    await queryUser({
      variables: {
        account: inAccount,
        password: hashedPassword
      }
    })
  }


  const handleSignUp = async ({ inAccount, inUserName, inPassword }) => {
    const hashedPassword = hashPassword(inPassword);
    const { data } = await createAccount({
      variables: {
        account: inAccount,
        name: inUserName,
        password: hashedPassword
      }
    })
    console.log('sign up result:', data.createAccount)
    if (data !== null) {
      setUsername(data.createAccount.name);
      setAccount(data.createAccount.account);
      displayStatus({
        type: "success",
        msg: "sign up successfully!"
      })
      setSignUp(false);
    } else {
      displayStatus({
        type: "error",
        msg: "Account already exists!"
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
                <div className='signUpRemind'>Have an account?
                  <span onClick={() => setSignUp(false)}>Sign in</span>
                </div>
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