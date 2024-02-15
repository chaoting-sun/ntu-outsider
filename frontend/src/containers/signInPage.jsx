import Typography from "@mui/material/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useLocation } from "react-router-dom";

import PathConstants from "../routes/pathConstants";
import { useOusider } from "./hooks/useOusider";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
import { hashPassword } from "../utils/hash";
import { useEffect, useState } from "react";
import { USER_QUERY } from "./graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "./graphql/mutation";
import "../css/signInPage.css";

// const useStyles = makeStyles({
//   signInFormHeader: {
//     color: "#1A202C",
//     fontWeight: "bold",
//     borderBottom: "none",
//     userSelect: "none",
//     marginBottom: '20px',
//   }
// });

const SignInPage = () => {
  // const StylesClasses = useStyles();
  const { displayStatus, autheticateAccount } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const [queryUser] = useLazyQuery(USER_QUERY, { fetchPolicy: "network-only" });
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setSignUp(location.state.signUp);
    }
  }, [location.state]);

  const handleLogIn = async ({ inAccount, inPassword }) => {
    const { data } = await queryUser({
      variables: {
        account: inAccount,
        password: inPassword,
      },
    });

    if (data.queryUser !== null) {
      autheticateAccount(data.queryUser);
      displayStatus({
        type: "success",
        msg: "log in successfully",
      });
      navigate(PathConstants.MAIN); // HomePage
    } else {
      displayStatus({
        type: "error",
        msg: "Account or password is incorrect!",
      });
    }
  };

  const handleSignUp = async ({ inAccount, inUserName, inPassword }) => {
    const hashedPassword = hashPassword(inPassword);

    console.log("create account...");

    const { data } = await createAccount({
      variables: {
        account: inAccount,
        name: inUserName,
        password: hashedPassword,
      },
    });

    if (data.createAccount !== null) {
      displayStatus({
        type: "success",
        msg: "sign up successfully!",
      });
      setSignUp(false);
    } else {
      displayStatus({
        type: "error",
        msg: "Account already exists!",
      });
    }
  };

  return (
    <div className="mainContainer">
      <div className="leftMainContainer">
        <div className="brandName1">
          <span onClick={() => navigate(PathConstants.MAIN)}>
            NTU<br></br>OUTSIDER
          </span>
        </div>
      </div>
      <div className="rightMainContainer">
        <div className="Form">
          {signUp ? (
            <>
              <Typography
                variant="h2"
                sx={{
                  color: "#1A202C",
                  fontWeight: "bold",
                  borderBottom: "none",
                  userSelect: "none",
                  marginBottom: "20px",
                }}
                // className={StylesClasses.signInFormHeader}
              >
                Sign Up
              </Typography>
              <SignUp handleSignUp={handleSignUp} />
              <div className="signUpRemind">
                Have an account?
                <span onClick={() => setSignUp(false)}>Log in</span>
              </div>
            </>
          ) : (
            <>
              <Typography
                variant="h2"
                sx={{
                  color: "#1A202C",
                  fontWeight: "bold",
                  borderBottom: "none",
                  userSelect: "none",
                  marginBottom: "20px",
                }}
                // className={StylesClasses.signInFormHeader}
              >
                Log In
              </Typography>
              <LogIn handleLogIn={handleLogIn} />
              <div className="signUpRemind">
                Do not have an account?
                <span onClick={() => setSignUp(true)}>Sign up</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
