import { Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import PathConstants from "../../routes/pathConstants";
import Tags from "../../components/tags/tags";
import { useOutsider } from "../hooks/useOutsider";
import {
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import PathContants from "../../routes/pathConstants";

import ActionConstants from "../../actions/actionConstants";
import styles from "./editPostPage.module.css";

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

  const location = useLocation();
  const navigate = useNavigate();

  const initPost = location.state?.post;
  const postId = initPost ? initPost._id : null;
  const action = location.state.action || "";

  const [updatedPost, setUpdatedPost] = useState(null);
  const [finishEdit, setFinishEdit] = useState(false);
  const [editedTag, setEditedTag] = useState(initPost?.tag || []);

  // navigate to LOGIN page if not authencated

  useEffect(() => {
    if (!authenticated) navigate(PathContants.LOGIN);
  }, [authenticated, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initPost?.title || "",
      classNo: initPost?.classNo || "",
      className: initPost?.className || "",
      teacherName: initPost?.teacherName || "",
      content: initPost?.content || "",
      condition: initPost?.condition || "",
      endDate: initPost?.deadline.split(" ")[0] || "",
      endTime: initPost?.deadline.split(" ")[1] || "",
      tags: initPost?.tags || [],
    },
  });

  // const [createPost] = useMutation(CREATE_POST_MUTATION);
  // const [updatePost] = useMutation(UPDATE_POST_MUTATION);
  const createPost = async (post) => ({ post });
  const updatePost = async (post) => ({ post });

  const onSubmit = async (formData) => {
    const {
      title,
      classNo,
      className,
      teacherName,
      content,
      condition,
      endDate,
      endTime,
    } = formData;
    const deadline = `${endDate} ${endTime}`;

    const updatedPost = {
      title,
      classNo,
      className,
      teacherName,
      content,
      condition,
      deadline,
      tag: editedTag,
      author: initPost ? initPost.author : { name: username, _id: userId },
    };

    try {
      let res;
      if (action === ActionConstants.ADD_POST) {
        updatedPost.userId = userId;
        res = await createPost(updatedPost);
        // res = await createPost({ variables: updatedPost });
      } else if (action === ActionConstants.EDIT_POST) {
        updatedPost._id = postId;
        res = await updatePost(updatedPost);
        // res = await updatePost({ variables: updatedPost });
      } else {
        console.log("action is wrong!");
      }

      if (res) {
        const successMessage =
          action === "createPost" ? "Post created!" : "Post updated!";
        displayStatus({ type: "success", msg: successMessage });
        // setUpdatedPost(res.data["createPost"]);
        console.log("result:", res);
        setUpdatedPost(res.post);
        setFinishEdit(true);
      } else {
        throw new Error("No response from the server");
      }
    } catch (error) {
      console.error(error);
      displayStatus({
        type: "fail",
        msg: error.message || "fail to save post!",
      });
    }
  };

  useEffect(() => {
    if (finishEdit) {
      navigate(PathConstants.MAIN, { state: { action, updatedPost } });
      setFinishEdit(false);
    }
  }, [finishEdit, updatedPost, navigate, action]);

  const ClassInformation = () => (
    <>
      {/* 標題 */}
      <input
        placeholder="Title"
        className={styles.title}
        {...register("title", { required: "Title is required" })}
      />
      {errors.title ? (
        <p className={styles.error}>{errors.title.message}</p>
      ) : null}
      {/* 課名 */}
      <div className={styles.rowItem}>
        <label>課名</label>
        <input
          className={styles.input}
          {...register("className", {
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
          className={styles.input}
          {...register("teacherName", {
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
          className={styles.input}
          {...register("classNo", {
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
      <input type="date" className={styles.time} {...register("endDate")} />
      &nbsp;
      <input type="time" className={styles.time} {...register("endTime")} />
    </div>
  );

  // console.log(watch("content")); // you can watch individual input by pass the name of the input
  // console.log(watch("tags")); // you can watch individual input by pass the name of the input

  return !authenticated ? null : (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <ClassInformation />
          <DeadlineInformation />
          <textarea
            name="content"
            rows="3"
            placeholder="Write something..."
            {...register("content", { required: true, maxLength: 500 })}
            className={styles.content}
          />
          <div className={styles.tags}>
            <Tags tags={editedTag} setTags={setEditedTag} />
          </div>
          <button className={styles.submit} type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditPostPage;
