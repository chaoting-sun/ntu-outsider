import { message } from "antd";
import { useContext, useState, useEffect, useCallback } from "react";
import { POST_QUERY, POST_COLLECTION_QUERY } from "../graphql";
import { useLazyQuery } from "@apollo/client";
import OutsiderContext from "./outsiderContext";
import {
  USERID_KEY,
  USERNAME_KEY,
  ACCOUNT_KEY,
  AUTHENTICATED_KEY,
} from "../../constants/localStorages";
import { normalizeFetchedPost } from "../utils";

// Define the provider component
const OutsiderProvider = (props) => {
  // get local storages

  // Initialize state variables
  // const [userId, setUserId] = useState(savedUserId || null);
  // const [username, setUsername] = useState(savedUsername || "");
  // const [account, setAccount] = useState(savedAccount || "");
  // const [authenticated, setAuthenticated] = useState(savedAuthenticated || false); // TODO: change to default: false
  const [userId, setUserId] = useState(
    localStorage.getItem(USERID_KEY) || null
  );
  const [username, setUsername] = useState(
    localStorage.getItem(USERNAME_KEY) || ""
  );
  const [account, setAccount] = useState(
    localStorage.getItem(ACCOUNT_KEY) || ""
  );
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem(AUTHENTICATED_KEY)) || false
  ); // TODO: change to default: false

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

  const [queryPost] = useLazyQuery(POST_QUERY, { fetchPolicy: "network-only" });

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
    console.log("  useEffect (UseOutsider)");

    const fetchAllPosts = async (type, queryString) => {
      const {
        data: { queryPost: fetchedPosts },
      } = await queryPost({ variables: { type: "all", queryString: "" } });
      setPosts(fetchedPosts.map(normalizeFetchedPost));
    };
    fetchAllPosts();
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

  const handleAuthenticated = (userId, account, name) => {
    setAuthenticated(true);
    setUserId(userId);
    setAccount(account);
    setUsername(name);
  };

  console.log(`re-render useOutsider`);

  // Define the context provider with the state
  return (
    <OutsiderContext.Provider
      value={{
        posts,
        userId,
        setUserId,
        account,
        username,
        preferTags,
        setPosts,
        setAccount,
        setUsername,
        setPreferTags,
        currentPost,
        authenticated,
        setAuthenticated,
        handleAuthenticated,
        // handleQueryPost,
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
