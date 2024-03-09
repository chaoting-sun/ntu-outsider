import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

import { useMutation } from "@apollo/client";
import { useOutsider } from "../hooks/useOutsider";
import PostLayout from "../../components/postLayout/postLayout";
import PathConstants from "../../routes/pathConstants";
import ActionConstants from "../../actions/actionConstants";

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
    userId,
    username,
    currentPost,
    displayStatus,
    doingQueryPost,
    setDoingQueryPost,
    doingQueryPostCollection,
    setDoingQueryPostCollection,
    handleQueryPost,
  } = useOutsider();

  const [posts, setPosts] = useState(initialPosts);
  // const [shouldUp]
  const [updatePostCollection] = useMutation(UPDATE_POST_COLLECTION_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  
  const navigate = useNavigate();
  const location = useLocation();

  const action = location.state?.action || "";
  const editedPost = location.state?.updatedPost || null;

  console.log("re-render MainPage");

  // useEffect(() => {
  //   setPosts(initialPosts);
  // }, [])


  useEffect(() => {
    if (action === ActionConstants.ADD_POST) {
      setPosts(posts => [editedPost, ...posts]);
    } else if (action === ActionConstants.EDIT_POST) {
      const postToEdit = posts.find(({ _id }) => _id === editedPost._id);
      if (_.isEqual(postToEdit, editedPost)) return;
      console.log("editedPost:", JSON.stringify(editedPost));
      console.log("postToEdit:", JSON.stringify(postToEdit));

      const updatedPosts = posts.map((post) =>
        post._id === editedPost._id ? editedPost : post
      );
      setPosts(updatedPosts);
    }
  }, [location, posts, action, editedPost, userId, username]);

  console.log(posts);

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

  const handleEditPost = (postToEdit) => {
    console.log("postToEdit:", postToEdit);
    navigate(PathConstants.EDIT_POST, {
      state: {
        action: ActionConstants.EDIT_POST,
        post: postToEdit,
      },
    });
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostLayout
          post={post}
          handleChat={handleChat}
          handleFollowPost={handleFollowPost}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
          key={post._id}
        />
      ))}
    </div>
  );
};

export default MainPage;
