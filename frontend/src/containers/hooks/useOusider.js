import { message } from 'antd'
import { createContext, useContext, useState, useEffect } from "react";
import { POST_QUERY } from "../graphql/index"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { postExamples } from "../db"

/*async function in useEffect:
  ref: https://devtrium.com/posts/async-functions-useeffect
*/

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

const LOCALSTORAGE_KEY='save-username';

const OutsiderProvider = (props) => {
  const saveUsername=localStorage.getItem(LOCALSTORAGE_KEY);
  const [userId, setUserId] = useState("");
  const [account, setAccount] = useState("");
  const [preferTags, setPreferTags] = useState([]);
  const [username, setUsername] = useState(saveUsername||"");
  const [authenticated, setAuthenticated] = useState(false);
  const [existingPost, setExistingPost] = useState([]);
  const [myPost, setMyPost] = useState([]);
  const [conditionedPost, setConditionedPost] = useState([]);
  const [currentPage, setCurrentPage] = useState("allPost");

  useEffect(() => {
    if (authenticated)
      localStorage.setItem(LOCALSTORAGE_KEY, username);
  }, [authenticated])

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
        conditionedPost,
        // postContent,
        // setPostContent,
        currentPage,
        setCurrentPage,
        displayStatus,
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };