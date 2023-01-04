import { message } from 'antd'
import { createContext, useContext, useState, useEffect } from "react";
import { POST_QUERY } from "../graphql/index"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { postExamples } from "../db"
import { USER_QUERY } from '../graphql/query';


// How to Persist a Logged-in User in React
// ref: https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
const USERID_KEY = "save-userId";
const USERNAME_KEY = "save-username";
const ACCOUNT_KEY = "save-account";
const AUTHENTICATED_KEY = "save-autheticated"

const OusiderContext = createContext({
  userId: "",
  username: "",
  passWord: "",
  authenticated: false,
  // postContent: [],
  currentPage: "",
  setUserId: () => { },
  setUsername: () => { },
  setPassword: () => { },
  setAuthenticated: () => { },
  // setPostContent: () => { },
  setCurrentPage: () => { },
  displayStatus: () => { },
})

const OutsiderProvider = (props) => {
  const savedUserId = localStorage.getItem(USERID_KEY);
  const savedUsername = localStorage.getItem(USERNAME_KEY);
  const savedAccount = localStorage.getItem(ACCOUNT_KEY);
  const savedAuthenticated = localStorage.getItem(AUTHENTICATED_KEY);
  const [userId, setUserId] = useState(savedUserId || null);
  const [username, setUsername] = useState(savedUsername || "");
  const [account, setAccount] = useState(savedAccount || "");
  const [authenticated, setAuthenticated] = useState(savedAuthenticated || false);
  const [preferTags, setPreferTags] = useState([]);
  const [currentPage, setCurrentPage] = useState("MainPage");

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem(USERID_KEY, userId);
      localStorage.setItem(USERNAME_KEY, account);
      localStorage.setItem(ACCOUNT_KEY, username);
      localStorage.setItem(AUTHENTICATED_KEY, authenticated);
    }
  }, [authenticated])

  const autheticateAccount = (user) => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", true);
    setUserId(user._id)
    setAccount(user.account)
    setUsername(user.name);
    console.log('authenticate account:', user._id, user.account, user.name)
  }

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = { content: msg, duration: 0.5 }

      switch (type) {
        case 'success':
          message.success(content) // show status of success
          break
        case 'error':
        default:
          message.error(content) // show status of error
          break
      }
    }
  }

  return (
    <OusiderContext.Provider
      value={{
        userId,
        setUserId,
        account,
        setAccount,
        username,
        setUsername,
        preferTags,
        setPreferTags,
        authenticated,
        setAuthenticated,
        // postContent,
        // setPostContent,
        currentPage,
        setCurrentPage,
        displayStatus,
        autheticateAccount
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };