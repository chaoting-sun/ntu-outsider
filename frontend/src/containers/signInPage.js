import "../css/signInPage.css";
import { useOusider } from "./hooks/useOusider";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { hashPassword } from "../utils/hash"
import { useEffect, useState } from "react";
import { USER_QUERY } from "./graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "./graphql/mutation";
import { getStatusClassNames } from "antd/es/_util/statusUtils";


const useStyles = makeStyles({
  signInFormHeader: {
    color: "#1A202C",
    fontWeight: "bold",
    borderBottom: "none",
    userSelect: "none",
    // textAlign: "left",
    marginBottom: '20px',
  }
});


const SignInPage = () => {
  const StylesClasses = useStyles();
  const { setAccount, setUsername,
    authenticated, setAuthenticated,
    displayStatus, setUserId,
    autheticateAccount } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const [queryUser] = useLazyQuery(USER_QUERY, { fetchPolicy: 'network-only' });
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setSignUp(location.state.signUp);
    }
  }, [location]);

  const handleLogIn = async ({ inAccount, inPassword }) => {
    // console.log(inAccount, inPassword);
    const { data } = await queryUser({
      variables: {
        account: inAccount,
        password: inPassword
      }
    })

    if (data.queryUser !== null) {
      autheticateAccount(data.queryUser);
      displayStatus({
        type: "success",
        msg: "log in successfully",
      })
      navigate('/') // HomePage
    } else {
      displayStatus({
        type: "error",
        msg: "Account or password is incorrect!",
      })
    }
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
    // console.log('sign up result:', data.createAccount)
    if (data.createAccount !== null) {
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

  const onClickToMainPage = () => { navigate('/'); }

  return (
    <div className="mainContainer">
      <div className="leftMainContainer">
        {/* <Typography
          variant="h1"
          className={titleStyles.text}
          align="left"
        >
          NTU
        </Typography>
        <Typography
          variant="h1"
          className={titleStyles.text}
          align="left"
        >
          OUTSIDER
        </Typography> */}

        {/* <button
            className="brandName1"
            style={{
              fontWeight: '500',
              background: 'none',
              border: 'none',
              fontSize: 150,
              color: "#20b2aa"
            }}
          >NTU</button>
          <button
            className="brandName1"
            style={{
              fontWeight: '500',
              background: 'none',
              border: 'none',
              fontSize: 130,
              color: "#20b2aa"
            }}
          >OUTSIDER</button> */}
        {/* <span onClick={}>NTU</span> */}

        <div className="brandName1">
          <span onClick={() => navigate('/') }>NTU<br></br>OUTSIDER</span>
        </div>
      </div>
      <div className="rightMainContainer">
        <div className="Form">
          {
            signUp ? (
              <>
                <Typography
                  variant="h2"
                  className={StylesClasses.signInFormHeader}
                >
                  Sign Up
                </Typography>
                {/* <div className="SignUpHeader">Sign Up</div> */}
                <SignUp handleSignUp={handleSignUp} />
                <div className='signUpRemind'>Have an account?
                  <span onClick={() => setSignUp(false)}>Log in</span>
                </div>
              </>
            ) : (
              <>
                <Typography
                  variant="h2"
                  className={StylesClasses.signInFormHeader}
                >
                  Log In
                </Typography>
                {/* <div className="logInHeader">Log In</div> */}
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