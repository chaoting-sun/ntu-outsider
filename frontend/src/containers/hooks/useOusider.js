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

const LOCALSTORAGE_KEY = 'save-username';

const OutsiderProvider = (props) => {
  const saveUsername = localStorage.getItem(LOCALSTORAGE_KEY);
  const [userId, setUserId] = useState("");
  const [account, setAccount] = useState("");
  const [preferTags, setPreferTags] = useState([]);
  const [username, setUsername] = useState(saveUsername || "");
  const [authenticated, setAuthenticated] = useState(false);

  const [currentPage, setCurrentPage] = useState("MainPage");
  const [mainPagePost, setMainPagePost] = useState([]);
  const [searchPagePost, setSearchPagePost] = useState([]);
  const [followedPagePost, setFollowedPagePost] = useState([]);
  const [myPostPagePost, setMyPostPagePost] = useState([]);
  const [postDom, setPostDom] = useState([]);

  useEffect(() => {
    if (authenticated)
      localStorage.setItem(LOCALSTORAGE_KEY, username);
  }, [authenticated])

  // useEffect(() => {
  //   switch (currentPage) {
  //     case "MainPage":
  //       setPostDom();
  //       break;
  //   }
  // }, [mainPagePost, searchPagePost]);


  // const ViewPost = (posts) => {
  //   return posts.map((post) => (
  //     <PostContainer key={post.postId}>
  //       <PostLayout
  //         postId={post.postId}
  //         posterName={post.author.name}
  //         posterAccount={post.author.account}
  //         title={post.title}
  //         classNo={post.classNo}
  //         className={post.className}
  //         teacherName={post.teacherName}
  //         content={post.content}
  //         condition={post.condition}
  //         deadline={post.deadline}
  //         tags={post.tags}
  //       />
  //     </PostContainer>
  //   ))
  // }

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
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };