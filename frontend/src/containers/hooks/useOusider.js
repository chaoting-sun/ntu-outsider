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


const OutsiderProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [existingPost, setExistingPost] = useState([]);
  const [myPost, setMyPost] = useState([]);
  const [conditionedPost, setConditionedPost] = useState([]);
  const [currentPage, setCurrentPage] = useState("allPost");


  const queryPost = async (type, queryString) => {
    // db <- queryPost(type, queryString)
    // db -> 
    return postExamples
  }

  const queryPostCollection = async (userId, type) => {
    // query function
    return postExamples.filter(({posterName}) => username === posterName)
  }
      
  const handleQueryConditionedPost = async ({ type, queryString }) => {
    // save the conditioned existing posts in conditionedPost
    const fetchedPost = await queryPost(type, queryString);
    /*TODO:
      clean the post data and save it in "conditionedPost"
    */
    setConditionedPost(fetchedPost);
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
        authenticated,
        setAuthenticated,
        conditionedPost,
        // postContent,
        // setPostContent,
        currentPage,
        setCurrentPage,
        displayStatus,
        handleQueryConditionedPost,
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };