import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../graphql/mutation";
import paths from "../../constants/paths";
import Tags from "../../components/tags/tags";
import { UseOutsider } from "../hooks/useOutsider";
import PathContants from "../../constants/paths";
import actions from "../../constants/actions";
import { displayStatus } from "../utils";
import { parseErrorMessage, standardizeFetchedPost } from "../utils";

import styles from "./editPostPage.module.css";

const defaultPost = {
  title: "化工實驗找人",
  classNo: "PE24336",
  className: "化工實驗",
  teacherName: "鄭進一",
  content: "找優秀的人一起做化工實驗",
  condition: 6,
  endDate: "2024-02-29",
  endTime: "12:42",
  tags: ["化工", "實驗"],
};

const EditPostPage = () => {
  const { authenticated, setPosts } = UseOutsider();

  const location = useLocation();
  const navigate = useNavigate();

  const initPost = location.state?.post;
  const postId = initPost ? initPost.postId : null;
  const authorId = initPost ? initPost.authorId : null;
  const action = location.state.action || "";

  const [finishEdit, setFinishEdit] = useState(false);
  const [editedTag, setEditedTag] = useState(initPost?.tag || defaultPost.tags);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initPost?.title || defaultPost.title,
      classNo: initPost?.classNo || defaultPost.classNo,
      className: initPost?.className || defaultPost.className,
      teacherName: initPost?.teacherName || defaultPost.teacherName,
      content: initPost?.content || defaultPost.content,
      condition: initPost?.condition || defaultPost.condition,
      endDate: initPost?.deadline.split(" ")[0] || defaultPost.endDate,
      endTime: initPost?.deadline.split(" ")[1] || defaultPost.endTime,
    },
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: ({ createPost }) => {
      const newPost = standardizeFetchedPost(createPost);
      setFinishEdit(true);
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      displayStatus({ type: "success", msg: "Post successfully created!" });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: ({ updatePost }) => {
      const updatedPost = standardizeFetchedPost(updatePost);
      setFinishEdit(true);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );
      displayStatus({ type: "success", msg: "Post successfully updated!" });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

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

    let updatedPost = {
      title,
      classNo,
      className,
      teacherName,
      content,
      condition: parseInt(condition),
      deadline,
      tag: editedTag,
    };

    console.log("action:", action);

    if (action === actions.ADD_POST) {
      createPost({ variables: updatedPost });
    } else if (action === actions.EDIT_POST) {
      updatePost({ variables: { ...updatedPost, postId, authorId } });
    }
  };

  useEffect(() => {
    if (finishEdit) {
      setFinishEdit(false);
      navigate(paths.MAIN);
    }
  }, [finishEdit, navigate]);

  const ClassInformation = () => (
    <>
      {/* 標題 */}
      <input
        name="title"
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
          name="className"
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
          name="teacherName"
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
          name="classNo"
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
          name="condition"
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
        name="date"
        type="date"
        className={styles.time}
        {...register("endDate")}
      />
      &nbsp;
      <input
        name="time"
        type="time"
        className={styles.time}
        {...register("endTime")}
      />
    </div>
  );

  // navigate to LOGIN page if not authencated

  if (!authenticated) navigate(PathContants.LOGIN);

  return (
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
