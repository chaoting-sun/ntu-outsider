import { message } from "antd";
import { useContext, useState, useEffect, useCallback } from "react";
import { POST_QUERY, POST_COLLECTION_QUERY, DELETE_POST_MUTATION, UPDATE_POST_COLLECTION_MUTATION, LOGOUT_MUTATION } from "../graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import OutsiderContext from "./outsiderContext";
import { USER_KEY, AUTHENTICATED_KEY } from "../../constants/localStorages";
import { displayStatus, standardizeFetchedPost } from "../utils";

// Define the provider component
const OutsiderProvider = (props) => {
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

  // Define function to handle post queries

  const [queryPost] = useLazyQuery(POST_QUERY, {
    onCompleted: ({ queryPost: fetchedPosts }) => {
      setPosts(fetchedPosts.map(standardizeFetchedPost));
    },
    onError: (error) => {
      console.log(error);
      displayStatus({ type: "fail", msg: "Failed to fetch posts" });
    },
  });

  // Define function to delete a post

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: ({ deletePost }) => {
      const { postId: deletedPostId } = deletePost;
      setPosts(posts.filter(({ postId }) => postId !== deletedPostId));
      displayStatus({ type: "success", msg: "delete the post!" });
    },
    onError: (error) => {
      displayStatus(standardizeFetchedPost(error));
    },
  });

  // Define function to update post collection

  const [updatePostCollection] = useMutation(UPDATE_POST_COLLECTION_MUTATION, {
    onCompleted: ({ updatePostCollection }) => {
      const { msg } = updatePostCollection;
      displayStatus({ type: "success", msg });
    },
    onError: (error) => {
      displayStatus(standardizeFetchedPost(error));
    },
  });

  useEffect(() => {
    queryPost({ variables: { type: "all", queryString: "" } });
  }, [queryPost]);

  // Define function to handle post queries

  // const [queryPost] = useLazyQuery(POST_QUERY, {
  //   onCompleted: ({ queryPost: fetchedPosts }) => {
  //     console.log("fetched posts:", fetchedPosts);
  //     setPosts(fetchedPosts.map(standardizeFetchedPost));
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     displayStatus({ type: "fail", msg: "Failed to fetch posts" });
  //   },
  // });

  // useEffect(() => {
  //   queryPost({ variables: { type: "all", queryString: "" } });
  // }, [queryPost]);

  // Define function to handle post collection queries
  const [queryPostCollection] = useLazyQuery(POST_COLLECTION_QUERY, {
    fetchPolicy: "network-only",
  });

  console.log(`re-render useOutsider`);

  // Define the context provider with the state
  return (
    <OutsiderContext.Provider
      value={{
        user,
        posts,
        authenticated,
        setUser,
        setPosts,
        setAuthenticated,
        queryPost,
        deletePost,
        updatePostCollection,
      }}
      {...props}
    />
  );
};

// Define context consumer
const UseOutsider = () => useContext(OutsiderContext);

export { OutsiderProvider, UseOutsider };
