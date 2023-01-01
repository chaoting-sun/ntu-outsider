import { message } from 'antd'
import { createContext, useContext, useState, useEffect } from "react";
import { POST_QUERY } from "../graphql/index"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";


const OusiderContext = createContext({
  username: "",
  passWord: "",
  authenticated: false,
  postInfo: [],
  currentPost: "",
  setUsername: () => { },
  setPassword: () => { },
  setAuthenticated: () => { },
  setPostInfo: () => { },
  setCurrentPost: () => { },
  displayStatus: () => { },
})


const OutsiderProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [postInfo, setPostInfo] = useState([]);
  const [currentPost, setCurrentPost] = useState("allPost");

  // const { data: fetchedPost } = useQuery(
  //   POST_QUERY, {
  //   variables: {
  //     userId: userId,
  //     type: currentPost
  //   },
  //   fetchPolicy: 'network-only', // used for first execution
  //   nextFetchPolicy: 'cache-first' // used for subsequent execution
  // }
  // );

  // useEffect(() => {
  // }, [currentPost])

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
        username,
        setUsername,
        password,
        setPassword,
        authenticated,
        setAuthenticated,
        postInfo,
        setPostInfo,
        currentPost,
        setCurrentPost,
        displayStatus
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };