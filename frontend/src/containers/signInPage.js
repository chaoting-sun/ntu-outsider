import { useOusider } from "./hooks/useOusider";
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/signInPage.css";
import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
// import Title from "../components/Title"
import { useNavigate, Link, useLocation } from "react-router-dom";
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
    setAuthenticated, displayStatus, setUserId, setPreferTags } = useOusider();
  const [signUp, setSignUp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      if (location.state === "signUp") {
        setSignUp(true);
        location.state = "";
      }
    }
  }, [location]);


  const autheticateAccount = (user) => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", true);

    setUserId(user.userId)
    setAccount(user.account)
    setUsername(user.username);
    setPreferTags(user.tags);

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
    const hashedPassword = hashPassword(inPassword);    
    const user = createAccount(inAccount, inUserName, inPassword);

    if (user) {
      displayStatus({
        type: "success",
        msg: "sign up successfully!"
      })
      setSignUp(false);
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

// import { useOusider } from "./hooks/useOusider";
// import { Button, Checkbox, Form, Input } from 'antd';
// import "../css/signInPage.css";
// import LogIn from "../components/logIn";
// import SignUp from "../components/signUp";
// // import Title from "../components/Title"
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { hashPassword } from "../utils/hash"
// import { useEffect, useState } from "react";
// import { USER_QUERY } from "./graphql/query";
// import { useLazyQuery, useMutation } from "@apollo/client";
// import { CREATE_ACCOUNT_MUTATION } from "./graphql/mutation";


// const SignInPage = () => {
//   const { setAccount, setUsername,
//     setAuthenticated, displayStatus, setUserId } = useOusider();
//   const [signUp, setSignUp] = useState(false);
//   const [queryUser, { data: UserByQuery }] = useLazyQuery(USER_QUERY);
//   const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
//   const navigate = useNavigate();

//   const autheticateAccount = (user) => {
//     setAuthenticated(true);
//     localStorage.setItem("authenticated", true);

//     setUserId(user._id)
//     setAccount(user.account)
//     setUsername(user.name);

//     displayStatus({
//       type: "success",
//       msg: "log in successfully",
//     })
//     navigate('/') // HomePage
//   }

//   const handleLogIn = async ({ inAccount, inPassword }) => {
//     const hashedPassword = hashPassword(inPassword);
//     await queryUser(inAccount, hashedPassword);
//   }

//   useEffect(() => {
//     if (UserByQuery === undefined) return;
//     if (UserByQuery !== null) {
//       autheticateAccount(UserByQuery);
//     } else {
//       displayStatus({
//         type: "error",
//         msg: "Account or password is incorrect!",
//       })
//     }
//   }, [UserByQuery]);

//   const handleSignUp = async ({ inAccount, inUserName, inPassword }) => {
//     const hashedPassword = hashPassword(inPassword);
//     const user = await createAccount(inAccount, inUserName, hashedPassword);

//     if (user !== null) {
//       displayStatus({
//         type: "success",
//         msg: "sign up successfully!"
//       })
//       setSignUp(false);
//     } else {
//       displayStatus({
//         type: "error",
//         msg: "account saved error!"
//       })
//     }
//   }

//   return (
//     <div className="mainContainer">
//       <div className="leftMainContainer">
//         <div className="brandName1">NTU</div>
//         <div className="brandName2">OUTSIDER</div>
//       </div>
//       <div className="rightMainContainer">
//         <div className="Form">
//           {
//             signUp ? (
//               <>
//                 <div className="SignUpHeader">Sign Up</div>
//                 <SignUp handleSignUp={handleSignUp} />
//                 <div className='signUpRemind'>Have an account?
//                   <span onClick={() => setSignUp(false)}>Sign in</span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="logInHeader">Log In</div>
//                 <LogIn handleLogIn={handleLogIn} />
//                 <div className='signUpRemind'>Do not have an account?
//                   <span onClick={() => setSignUp(true)}>Sign up</span>
//                 </div>
//               </>
//             )
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

export default SignInPage;