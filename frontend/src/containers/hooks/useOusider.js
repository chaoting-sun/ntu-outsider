import { message } from 'antd'
import { createContext, useContext, useState, useEffect } from "react";
import { POST_QUERY, POST_COLLECTION_QUERY } from '../graphql';
import { useLazyQuery } from "@apollo/client";

// Constants for local storage
const USERID_KEY = "save-userId";
const USERNAME_KEY = "save-username";
const ACCOUNT_KEY = "save-account";
const AUTHENTICATED_KEY = "save-autheticated"

// Create the context object
const OusiderContext = createContext({
  userId: null,
  username: "",
  passWord: "",
  authenticated: false,
  setUserId: () => { },
  setUsername: () => { },
  setPassword: () => { },
  setAuthenticated: () => { },
  displayStatus: () => { }
});

// Define the provider component
const OutsiderProvider = (props) => {
  // Initialize state variables
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [preferTags, setPreferTags] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  const [doingQueryPost, setDoingQueryPost] = useState(false);
  const [doingQueryPostCollection, setDoingQueryPostCollection] = useState(false);

  // Load data from local storage
  useEffect(() => {
    const savedUserId = localStorage.getItem(USERID_KEY);
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    const savedAccount = localStorage.getItem(ACCOUNT_KEY);
    const savedAuthenticated = localStorage.getItem(AUTHENTICATED_KEY);
    setUserId(savedUserId || null);
    setUsername(savedUsername || "");
    setAccount(savedAccount || "");
    setAuthenticated(savedAuthenticated || false);
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(ACCOUNT_KEY, account);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(AUTHENTICATED_KEY, authenticated);
  }, [authenticated, userId, account, username]);

  // Define function to display status message
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = { content: msg, duration: 1 }

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

  // Define function to handle post queries
  const [queryPost] = useLazyQuery(POST_QUERY, { fetchPolicy: 'network-only' });
  const handleQueryPost = async (type, queryString) => {
    setDoingQueryPost(true);
    const { data } = await queryPost({
      variables: {
        type: type,
        queryString: queryString
      }
    })
    setCurrentPost(data.queryPost);
    return data.queryPost;
  }

  // Define function to handle post collection queries
  const [queryPostCollection] = useLazyQuery(POST_COLLECTION_QUERY, { fetchPolicy: 'network-only' });
  const handleQueryPostCollection = async (type) => {
    setDoingQueryPostCollection(true);
    const { data } = await queryPostCollection({
      variables: {
        userId: userId,
        type: type
      }
    })
    setCurrentPost(data.queryPostCollection);
    return data.queryPostCollection;
  }

  // Define function to autheticate account
  const autheticateAccount = (user) => {
    setAuthenticated(true);
    setUserId(user._id);
    setAccount(user.account);
    setUsername(user.name);
  }

  // Define the context provider with the state
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
        currentPost,
        authenticated,
        setAuthenticated,
        displayStatus,
        autheticateAccount,
        handleQueryPost,
        handleQueryPostCollection,
        doingQueryPost,
        setDoingQueryPost,
        doingQueryPostCollection,
        setDoingQueryPostCollection,
      }}
      {...props}
    />
  )
}

// Define context consumer
const useOusider = () => useContext(OusiderContext);

export { OutsiderProvider, useOusider };