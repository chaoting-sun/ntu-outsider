import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useOutsider } from "../hooks/useOutsider";
import PostLayout from "../../components/postLayout/postLayout";
import PathConstants from "../../routes/pathConstants";

import styles from "./mainPage.module.css";

import {
  DELETE_POST_MUTATION,
  UPDATE_POST_COLLECTION_MUTATION,
} from "../graphql";

const initialPosts = [
  {
    _id: "ergjrigj",
    title: "Find a good partner",
    author: {
      _id: "38549hhv5-6jjw4v4å",
      name: "chaoting",
    },
    className: "parallel computing",
    teacherName: "Weng, Chao-Chao",
    classNo: "No.313",
    deadline: "2022.08.01",
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
    deadline: "2022.08.01",
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
    deadline: "2022.08.01",
    condition: 9,
    tag: ["urgent", "good", "5 people"],
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam eaque omnis id eligendi pariatur amet veritatis expedita recusandae hic doloribus, consequuntur quos ratione reiciendis reprehenderit aliquid quas nostrum voluptate rerum.",
  },
];

const MainPage = () => {
  const {
    userId,
    currentPost,
    displayStatus,
    doingQueryPost,
    setDoingQueryPost,
    doingQueryPostCollection,
    setDoingQueryPostCollection,
    handleQueryPost,
  } = useOutsider();

  const [posts, setPosts] = useState(initialPosts);

  const [updatePostCollection] = useMutation(UPDATE_POST_COLLECTION_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const navigate = useNavigate();

  console.log("I am MainPage!");

  // useEffect(() => {
  //   handleQueryPost("all", "") // default queryPost
  //     .then((fetchedPost) => {
  //       setPosts(fetchedPost);
  //       // console.log('fetchedPost:', fetchedPost);
  //     });
  // }, [handleQueryPost]);

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
      navigate(PathConstants.MAIL, { state: author });
    }
  };

  const handleFollowPost = async (postId) => {
    const { data } = await updatePostCollection({
      variables: { userId, postId },
    });
    const fetchedPost = data.updatePostCollection.postCollection;
    if (fetchedPost.find((id) => id === postId) !== undefined) {
      displayStatus({ type: "success", msg: "follow the post!" });
    } else {
      displayStatus({ type: "success", msg: "unfollow the post!" });
    }
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

  const handleEditPost = (editedPost) => {
    navigate(PathConstants.EDIT_POST, {
      state: {
        action: "editPost",
        post: editedPost,
      },
    });
  };

  const Posts = () =>
    posts.map((post) => (
      <PostLayout
        post={post}
        handleChat={handleChat}
        handleFollowPost={handleFollowPost}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
        key={post._id}
      />
    ));

  return (
    <div className={styles.container}>
      <Posts />
    </div>
  );
};

export default MainPage;
