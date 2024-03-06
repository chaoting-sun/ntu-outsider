import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tags from "../../components/tags/tags";
import { useOutsider } from "../hooks/useOutsider";
import {
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../graphql/mutation";
import { useMutation } from "@apollo/client";

import styles from "./editPostPage.module.css";

const { TextArea } = Input;

//reference: https://codesandbox.io/s/react-hook-form-get-started-j5wxo?file=/src/index.js:0-1102

// set default value of the form for useFrom
// ref: https://stackoverflow.com/questions/70663158/set-default-values-in-react-hook-form

// const PostCard = styled(Card)`
//   // position: relative;
//   // top: -15vh;
// `;

//從"/viewPostPage"傳入的state = {
// class
// classNo
// endDate
// endTime
// remainder
// teacher
// title
// }
// e.g. defaultValue={state ? state.title: null}

// const getInfo = (post) => {
//   const infoList = ['title', 'className', 'teacherName',
//                     'classNo', 'content', 'condition', 'tags'];
//   let info = {};
//   for (let i = 0; i < infoList.length; i++) {
//     info[infoList[i]] = post ? post[infoList[i]] : null;
//   }
//   info['endDate'] = post ? post.deadline.split(" ")[0] : null;
//   info['endTime'] = post ? post.deadline.split(" ")[1] : null;
//   return info;
// }

const classDetail = (post) => {
  return [
    {
      name: "課名",
      placeholder: "ex: 化工實驗",
      defaultValue: post ? post.className : "",
      type: "text",
      constraint: {},
    },
    {
      name: "授課老師",
      placeholder: "ex: 鄭進一",
      defaultValue: post ? post.className : "",
      type: "text",
      constraint: {},
    },
    {
      name: "課程流水號",
      placeholder: "ex: PE24336",
      defaultValue: post ? post.classNo : "",
      type: "text",
      constraint: {},
    },
    {
      name: "尚須徵求人數",
      placeholder: "ex: PE24336",
      defaultValue: post ? post.condition : "",
      type: "number",
      constraint: { min: "0" },
    },
    {
      name: "課程流水號",
      placeholder: "ex: PE24336",
      defaultValue: post ? post.classNo : "",
      type: "text",
      constraint: {},
    },
  ];
};

const EditPostPage = () => {
  const { username, userId, displayStatus, authenticated } = useOutsider();
  const [action, setAction] = useState("");
  const [updatedPost, setUpdatedPost] = useState(null);
  const [finishEdit, setFinishEdit] = useState(false);
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  console.log("I am EditPostPage!");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (location.state !== null) {
      // console.log('info:', location.state);

      const postInfo = location.state.post;

      setAction(location.state.action);
      setPost(postInfo);
      setTags(postInfo ? postInfo.tag : []);
      setPostId(location.state._id);
      setContent(postInfo ? postInfo.content : "");

      let defaultValues = {
        title: postInfo ? postInfo.title : "",
      };
      reset({ ...defaultValues });
    }
  }, [location]);

  const handleEditPost = () => {};

  const onSubmit = async ({
    title,
    classNo,
    className,
    teacherName,
    content,
    condition,
    endDate,
    endTime,
    tags,
  }) => {
    const updatedPost = {
      title,
      classNo,
      className,
      teacherName,
      content,
      condition,
      tags,
      deadline: `${endDate} ${endTime}`,
    };

    let outData = null;

    if (action === "createPost") {
      updatedPost.userId = userId;
      outData = await createPost({ variables: updatedPost });
    } else if (action === "editPost") {
      updatedPost.postId = post._id;
      outData = await updatePost({ variables: updatedPost });
    }

    if (outData) {
      displayStatus({ type: "success", msg: "create a post!" });
      setUpdatedPost(outData.data.createPost);
      setFinishEdit(true);
    } else {
      displayStatus({
        type: "fail",
        msg: "fail to save post!",
      });
    }
  }; // your form submit function which will invoke after successful validation

  useEffect(() => {
    if (finishEdit) {
      navigate(-1, {
        state: {
          action: "edit",
          post: updatedPost,
        },
      }); //use mutation; 傳入該篇文章資料
      setFinishEdit(false);
    }
  }, [finishEdit]);

  const ClassInformation = () => (
    <>
      {/* 標題 */}
      <input
        defaultValue={post ? post.title : ""}
        placeholder="Title"
        className={styles.title}
        {...register("Title", { required: "Title is required" })}
      />
      {errors.title ? (
        <p className={styles.error}>{errors.title.message}</p>
      ) : null}
      {/* 課名 */}
      <div className={styles.rowItem}>
        <label>課名</label>
        <input
          defaultValue={post ? post.className : ""}
          className={styles.input}
          {...register("Class name", {
            required: "Class name is required",
          })}
        />
      </div>
      {errors.class ? (
        <p className={styles.error}>{errors.class.message}</p>
      ) : null}
      {/* 授課老師 */}
      <div className={styles.rowItem}>
        <label>授課老師</label>
        <input
          defaultValue={post ? post.teacherName : ""}
          className={styles.input}
          {...register("Teacher name", {
            required: "Teacher name is required",
          })}
        />
      </div>
      {errors.teacher ? (
        <p className={styles.error}>{errors.teacher.message}</p>
      ) : null}
      {/* 課程流水號 */}
      <div className={styles.rowItem}>
        <label>課程流水號</label>
        <input
          defaultValue={post ? post.classNo : ""}
          className={styles.input}
          {...register("Class number", {
            required: "Class number is required",
          })}
        />
      </div>
      {errors.classNo ? (
        <p className={styles.error}>{errors.classNo.message}</p>
      ) : null}
      {/* 徵求人數 */}
      <div className={styles.rowItem}>
        <label>徵求人數</label>
        <input
          defaultValue={post ? post.condition : ""}
          type="number"
          min="0"
          className={styles.input}
          {...register("condition")}
        />
      </div>
    </>
  );

  const DeadlineInformation = () => (
    <div className={styles.rowItem}>
      <label>截止時間</label>
      <input
        defaultValue={post ? post.deadline.split(" ")[0] : ""}
        type="date"
        className={styles.time}
        {...register("End Date")}
      />{" "}
      &nbsp;
      <input
        defaultValue={post ? post.deadline.split(" ")[1] : ""}
        type="time"
        className={styles.time}
        {...register("End time")}
      />
    </div>
  );

  //console.log(watch("example")); // you can watch individual input by pass the name of the input

  // return !authenticated ? null : (
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          {/* <Button className={styles.username}>{username}</Button> */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <ClassInformation />
            <DeadlineInformation />
            <TextArea
              value={content}
              defaultValue={post ? post.content : ""}
              rows={3}
              onChange={(e) => setContent(e.target.value)}
              className={styles.content}
            />
            <div className={styles.tags}>
              <Tags tags={tags} setTags={setTags} />
            </div>
            <Button variant="contained" className={styles.submit} type="submit">
              SUBMIT
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default EditPostPage;
