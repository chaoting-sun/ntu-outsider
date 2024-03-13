import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

import { useMutation, useLazyQuery } from "@apollo/client";
import { UseOutsider } from "../hooks/useOutsider";
import PostLayout from "../../components/postLayout/postLayout";
import paths from "../../constants/paths";
import actions from "../../constants/actions";
import { displayStatus, standardizeFetchedPost } from "../utils";
import UseQueryPosts from "../hooks/useQueryPosts";

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
    setPosts,
    queryPost,
    deletePost,
    updatePostCollection,
    user: { userId },
  } = UseOutsider();
  const navigate = useNavigate();

  // const [queryPostType, setQueryPostType] = useState("all");
  // const [queryPostString, setQueryPostString] = useState("");

  console.log("mainPage", posts.length);

  const handleFollowPost = async (postId) => {
    updatePostCollection({ variables: { postId } });
  };

  const handleDeletePost = async (postId, authorId) => {
    deletePost({ variables: { postId, authorId } });
  };

  const handleEditPost = (postToEdit) => {
    navigate(paths.EDIT_POST, {
      state: {
        action: actions.EDIT_POST,
        post: postToEdit,
      },
    });
  }

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

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostLayout
          key={post.postId}
          post={post}
          handleChat={handleChat}
          handleFollowPost={handleFollowPost}
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
        />
      ))}
    </div>
  );
};

export default MainPage;
