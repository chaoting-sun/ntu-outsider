import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { ExclamationCircleFilled } from "@ant-design/icons";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { UseOutsider } from "../../containers/hooks/useOutsider";
import Tooltip from "@mui/material/Tooltip";
import { Modal } from "antd";
const { confirm } = Modal;
import paths from "../../constants/paths";
import { CREATE_CHATBOX_MUTATION } from "../../containers/graphql";
import styles from "./postLayout.module.css";
import PropTypes from "prop-types";

const PostLayout = ({
  post,
  handleFollowPost,
  handleEditPost,
  handleDeletePost,
}) => {
  const {
    user: { userId },
    authenticated,
  } = UseOutsider();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [me, setMe] = useState(post.authorId === userId);

  // console.log("PostLayout");
  console.log(post.authorId, userId, me);

  const navigate = useNavigate();
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);

  const ShowDeletePostModal = () => {
    confirm({
      title: "Do you Want to delete the post?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        console.log("OK");
        handleDeletePost(post.postId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleChat = async () => {
    console.log("handle chat");
    if (post.authorId === userId) {
      navigate(paths.MY_PROFILE);
    } else {
      const box = await createChatBox({
        variables: {
          name: userId,
          to: post.authorId,
        },
      });
      navigate(paths.MAIL, {
        state: {
          PosterId: post.authorId,
          Box: box.data.createChatBox,
        },
      });
    }
  };

  const Description = () => {
    return (
      <Grid
        item
        xs
        container
        direction="column"
        spacing={1}
        className={styles.desc}
      >
        <Grid item xs>
          <Typography variant="subtitle1" className={styles.detail}>
            {post.className}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.detail}
          >
            授課老師： {post.teacherName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.detail}
          >
            流水號： {post.classNo}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.detail}
          >
            截止時間： {post.deadline}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.detail}
          >
            剩餘徵求名額： {post.condition}
          </Typography>
          <div className={styles.chips}>
            {post.tag.map((e) => (
              <Chip
                variant="outlined"
                key={e}
                label={e}
                className={styles.chip}
              />
            ))}
          </div>
        </Grid>
        <Grid item>
          <Typography paragraph className={styles.content} align="left">
            {post.content}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const AdmittedAction = () =>
    authenticated && (
      <div className={`${styles.actions} ${me ? styles.actionsMe : null}`}>
        {me && (
          <>
            <Tooltip
              title="delete"
              placement="top"
              arrow
              className={styles.actionButton}
            >
              <IconButton aria-label="delete" onClick={ShowDeletePostModal}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="edit"
              placement="top"
              arrow
              className={styles.actionButton}
            >
              <IconButton
                aria-label="edit"
                onClick={() => handleEditPost(post)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip
          title="follow / unfollow"
          placement="top"
          arrow
          className={styles.actionButton}
        >
          <IconButton
            aria-label="save"
            onClick={() => handleFollowPost(post.postId)}
          >
            <DataSaverOnIcon />
          </IconButton>
        </Tooltip>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography gutterBottom className={styles.title}>
          {post.title}
        </Typography>
        <AdmittedAction />
      </div>
      <Divider />
      <Button className={styles.name} onClick={() => handleChat()}>
        {post.authorName}
      </Button>
      <Description />
    </div>
  );
};

PostLayout.propTypes = {
  post: PropTypes.shape({
    authorId: PropTypes.string,
    authorName: PropTypes.string,
    postId: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    teacherName: PropTypes.string,
    classNo: PropTypes.string,
    deadline: PropTypes.string, // PropTypes.instanceOf(Date),
    condition: PropTypes.number,
    tag: PropTypes.array,
    content: PropTypes.string,
  }),
  handleFollowPost: PropTypes.func,
  handleEditPost: PropTypes.func,
  handleDeletePost: PropTypes.func,
};

export default PostLayout;
