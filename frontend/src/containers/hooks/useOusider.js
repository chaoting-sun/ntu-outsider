import { message } from 'antd'
import { createContext, useContext, useState, useEffect} from "react";
import { POST_QUERY, POST_COLLECTION_QUERY, CHATBOXES_QUERY, CHATBOX_SUBSCRIPTION, MESSAGE_SUBSCRIPTION  } from '../graphql';
import { useLazyQuery, useQuery } from "@apollo/client";


// How to Persist a Logged-in User in React
// ref: https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
const USERID_KEY = "save-userId";
const USERNAME_KEY = "save-username";
const ACCOUNT_KEY = "save-account";
const AUTHENTICATED_KEY = "save-autheticated"

const OusiderContext = createContext({
  userId: null,
  username: "",
  passWord: "",
  authenticated: false,
  // postContent: [],
  setUserId: () => { },
  setUsername: () => { },
  setPassword: () => { },
  setAuthenticated: () => { },
  // setPostContent: () => { },
  displayStatus: () => { },
})

const OutsiderProvider = (props) => {
  // local storage for user account
  const savedUserId = localStorage.getItem(USERID_KEY);
  const savedUsername = localStorage.getItem(USERNAME_KEY);
  const savedAccount = localStorage.getItem(ACCOUNT_KEY);
  const savedAuthenticated = localStorage.getItem(AUTHENTICATED_KEY);
  // global hooks
  const [userId, setUserId] = useState(savedUserId || null);
  const [username, setUsername] = useState(savedUsername || "");
  const [account, setAccount] = useState(savedAccount || "");
  const [authenticated, setAuthenticated] = useState(savedAuthenticated || false);
  const [preferTags, setPreferTags] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  // appollo functions / helper hooks
  const [queryPost] = useLazyQuery(POST_QUERY, { fetchPolicy: 'network-only' });
  const [queryPostCollection] = useLazyQuery(POST_COLLECTION_QUERY, { fetchPolicy: 'network-only' });
  const [doingQueryPost, setDoingQueryPost] = useState(false);
  const [doingQueryPostCollection, setDoingQueryPostCollection] = useState(false);
  

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem(USERID_KEY, userId);
      localStorage.setItem(ACCOUNT_KEY, account);
      localStorage.setItem(USERNAME_KEY, username);
      localStorage.setItem(AUTHENTICATED_KEY, authenticated);
    } else {
      setUserId(null);
      setUsername("");
      setAccount("");
      setAccount("");
      setAuthenticated(false);
      
      localStorage.setItem(USERID_KEY, userId);
      localStorage.setItem(ACCOUNT_KEY, account);
      localStorage.setItem(USERNAME_KEY, username);
      localStorage.setItem(AUTHENTICATED_KEY, authenticated);
    }
  }, [authenticated])

  const storeInLocalStorage = () => {
    
  }

  const autheticateAccount = (user) => {
    setAuthenticated(true);
    setUserId(user._id);
    setAccount(user.account);
    setUsername(user.name);
    console.log('authenticate account:', user._id, user.account, user.name)
  }

  const handleQueryPost = async (type, queryString) => {
    console.log(type, queryString);
    // type = classNo, title, className, teacherName, tag, all
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

  const handleQueryPostCollection = async (type) => {
    // type = savedPost, followedPost, uploadedPost
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

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };