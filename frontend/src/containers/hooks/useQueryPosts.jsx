import { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { POST_QUERY } from "../graphql";
import { displayStatus, standardizeFetchedPost } from "../utils";
import { UseOutsider } from "./useOutsider";

const UseQueryPosts = () => {
  console.log("useQueryPosts");
  const { posts, setPosts } = UseOutsider();
  const [initialized, setInitialized] = useState(false);

  const [queryPost] = useLazyQuery(POST_QUERY, {
    onCompleted: ({ queryPost: fetchedPosts }) => {
      // console.log("fetched posts:", fetchedPosts);
      setPosts(fetchedPosts.map(standardizeFetchedPost));
    },
    onError: (error) => {
      console.log(error);
      displayStatus({ type: "fail", msg: "Failed to fetch posts" });
    },
  });

  return {
    queryPost,
  };
};

export default UseQueryPosts;
