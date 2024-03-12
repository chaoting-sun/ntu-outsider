import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

import { useMutation, useLazyQuery } from "@apollo/client";
import { UseOutsider } from "../hooks/useOutsider";
import PostLayout from "../../components/postLayout/postLayout";
import paths from "../../constants/paths";
import actions from "../../constants/actions";
import { displayStatus } from "../utils";

import styles from "./mainPage.module.css";

import {
  POST_QUERY,
  DELETE_POST_MUTATION,
  UPDATE_POST_COLLECTION_MUTATION,
} from "../graphql";

const initialPosts = [
  {
    _id: "ergjrigj",
    title: "Find a good partner",
    author: {
      _id: "38549hhv5-6jjw4v4",
      name: "chaoting",
    },
    className: "parallel computing",
    teacherName: "Weng, Chao-Chao",
    classNo: "No.313",
    deadline: "2024-02-27 21:35",
    condition: 5,
    tag: ["urgent", "good", "5 people"],
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam eaque omnis id eligendi pariatur amet veritatis expedita recusandae hic doloribus, consequuntur quos ratione reiciendis reprehenderit aliquid quas nostrum voluptate rerum.",
  },
  {
    _id: "ergjeffigj",
    title: "Find a good partnersssss",
    author: {
      _id: "38549hhv5-6jjw4v4å",
      name: "chaoting",
    },
    className: "parallel computing",
    teacherName: "Weng, Chao-Chao",
    classNo: "No.313",
    deadline: "2024-03-27 21:00",
    condition: 9,
    tag: ["urgent", "good", "5 people"],
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam eaque omnis id eligendi pariatur amet veritatis expedita recusandae hic doloribus, consequuntur quos ratione reiciendis reprehenderit aliquid quas nostrum voluptate rerum.",
  },
  {
    _id: "ergjeefefigj",
    title: "Find a good partnersssss",
    author: {
      _id: "38549hhv5-6jjw4v4å",
      name: "chaoting",
    },
    className: "parallel computing",
    teacherName: "Weng, Chao-Chao",
    classNo: "No.313",
    deadline: "2024-03-27 03:00",
    condition: 9,
    tag: ["urgent", "good", "5 people"],
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam eaque omnis id eligendi pariatur amet veritatis expedita recusandae hic doloribus, consequuntur quos ratione reiciendis reprehenderit aliquid quas nostrum voluptate rerum.",
  },
];

const MainPage = () => {
  const {
    posts,
    user: { userId },
    setPosts,
    currentPost,
    doingQueryPost,
    setDoingQueryPost,
    doingQueryPostCollection,
    setDoingQueryPostCollection,
    // handleQueryPost,
  } = UseOutsider();

  const navigate = useNavigate();
  const location = useLocation();

  const editedPost = location.state?.updatedPost || null;

  // const [shouldUp]
  const [action, setAction] = useState(location.state?.action || null);
  const [updatePostCollection] = useMutation(UPDATE_POST_COLLECTION_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const [queryPost] = useLazyQuery(POST_QUERY, { fetchPolicy: "network-only" });
  const lastEditedPostIdRef = useRef(null);

  useEffect(() => {
    console.log(
      `  useEffect(MainPage), action=${action} lastId=${lastEditedPostIdRef.current}`
    );

    if (editedPost?.postId !== lastEditedPostIdRef.current) {
      if (action === actions.ADD_POST) {
        setPosts((prevPosts) => [editedPost, ...prevPosts]);
      } else if (action === actions.EDIT_POST) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.postId === editedPost.postId ? editedPost : post
          )
        );
      }
      lastEditedPostIdRef.current = editedPost?.postId;
    }
  }, [action, editedPost, setPosts]);

  // useEffect(() => {
  //   if (doingQueryPost) {
  //     // search on menu
  //     setPosts(currentPost);
  //     setDoingQueryPost(false);
  //   }
  //   if (doingQueryPostCollection) {
  //     // search my post
  //     setPosts(currentPost);
  //     setDoingQueryPostCollection(false);
  //   }
  // }, [currentPost]);

  const handleChat = (author) => {
    if (author._id === userId) {
      displayStatus({
        type: "fail",
        msg: "This is your post!",
      });
    } else {
      navigate(paths.MAIL, { state: author });
    }
  };

  const handleFollowPost = async (postId) => {
    // const { data } = await updatePostCollection({
    //   variables: { userId, postId },
    // });
    // const fetchedPost = data.updatePostCollection.postCollection;
    // if (fetchedPost.find((id) => id === postId) !== undefined) {
    //   displayStatus({ type: "success", msg: "follow the post!" });
    // } else {
    //   displayStatus({ type: "success", msg: "unfollow the post!" });
    // }
  };

  const handleDeletePost = async (postId) => {
    setPosts(posts.filter(({ _id }) => _id !== postId));

    /* TODO: make deletePost work! */
    // const fetchedPost = await deletePost({
    //   variables: { postId: postId._id },
    // });

    const fetchedPost = true;
    if (fetchedPost) {
      displayStatus({ type: "success", msg: "delete the post!" });
    }
  };

  const handleEditPost = (postToEdit) => {
    // console.log("postToEdit:", postToEdit);
    navigate(paths.EDIT_POST, {
      state: {
        action: actions.EDIT_POST,
        post: postToEdit,
      },
    });
  };

  console.log(`re-render MainPage`);

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostLayout
          post={post}
          handleChat={handleChat}
          handleFollowPost={handleFollowPost}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
          key={post.postId}
        />
      ))}
    </div>
  );
};

export default MainPage;
