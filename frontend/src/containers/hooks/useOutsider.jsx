import { message } from "antd";
import { useContext, useState, useEffect, useCallback } from "react";
import { POST_QUERY, POST_COLLECTION_QUERY } from "../graphql";
import { useLazyQuery } from "@apollo/client";
import OutsiderContext from "./outsiderContext";
import { USER_KEY, AUTHENTICATED_KEY } from "../../constants/localStorages";
import { displayStatus, standardizeFetchedPost } from "../utils";

// Define the provider component
const OutsiderProvider = (props) => {
  console.log("outsider user:", JSON.parse(localStorage.getItem(USER_KEY)));
  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(USER_KEY)) || {
      userId: null,
      account: null,
      name: null,
    }
  );
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem(AUTHENTICATED_KEY)) || false
  );

  const [posts, setPosts] = useState([]);
  const [preferTags, setPreferTags] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);
  const [doingQueryPost, setDoingQueryPost] = useState(false);
  const [doingQueryPostCollection, setDoingQueryPostCollection] =
    useState(false);

  // Save data to local storage

  // useEffect(() => {
  //   localStorage.setItem(USERID_KEY, userId);
  //   localStorage.setItem(ACCOUNT_KEY, account);
  //   localStorage.setItem(USERNAME_KEY, username);
  //   localStorage.setItem(AUTHENTICATED_KEY, authenticated);
  // }, [authenticated, userId, account, username]);

  // Define function to handle post queries

  const [queryPost] = useLazyQuery(POST_QUERY, {
    onCompleted: ({ queryPost: fetchedPosts }) => {
      console.log("fetched posts:", fetchedPosts);
      setPosts(fetchedPosts.map(standardizeFetchedPost));
    },
    onError: (error) => {
      console.log(error);
      displayStatus({ type: "fail", msg: "Failed to fetch posts" });
    },
  });

  // const handleFetchAllPosts = useCallback(
  //   async (type, queryString) => {
  //     try {
  //       const {
  //         data: { queryPost: fetchedPosts },
  //       } = await queryPost({ variables: { type, queryString } });
  //       console.log("fetchedPosts:", fetchedPosts);
  //       setPosts(fetchedPosts);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [queryPost, setPosts]
  // );

  // useEffect(() => {
  //   console.log("useEffect");
  //   handleFetchAllPosts("all", "");
  // }, [handleFetchAllPosts]);

  useEffect(() => {
    queryPost({ variables: { type: "all", queryString: "" } });
  }, [queryPost]);

  // const handleQueryPost = async (type, queryString) => {
  //   setDoingQueryPost(true);
  //   const { data } = await queryPost({
  //     variables: {
  //       type: type,
  //       queryString: queryString,
  //     },
  //   });
  //   console.log("handle query post:", data);
  //   setCurrentPost(data.queryPost);
  //   return data.queryPost;
  // };

  // Define function to handle post collection queries
  const [queryPostCollection] = useLazyQuery(POST_COLLECTION_QUERY, {
    fetchPolicy: "network-only",
  });
  const handleQueryPostCollection = async (type) => {
    // setDoingQueryPostCollection(true);
    // const { data } = await queryPostCollection({
    //   variables: { userId: userId, type: type },
    // });
    // setCurrentPost(data.queryPostCollection);
    // return data.queryPostCollection;
  };

  console.log(`re-render useOutsider`);

  // Define the context provider with the state
  return (
    <OutsiderContext.Provider
      value={{
        user,
        setUser,
        posts,
        preferTags,
        setPosts,
        setPreferTags,
        currentPost,
        authenticated,
        setAuthenticated,
        handleQueryPostCollection,
        doingQueryPost,
        setDoingQueryPost,
        doingQueryPostCollection,
        setDoingQueryPostCollection,
      }}
      {...props}
    />
  );
};

// Define context consumer
const UseOutsider = () => useContext(OutsiderContext);

export { OutsiderProvider, UseOutsider };
