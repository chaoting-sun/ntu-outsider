import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
// import { Button, Modal, Space, Tag } from "antd";
import { useQuery, useMutation } from "@apollo/client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { ExclamationCircleFilled } from "@ant-design/icons";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { useOutsider } from "../../containers/hooks/useOutsider";
import Tooltip from "@mui/material/Tooltip";

import { Modal } from "antd";
const { confirm } = Modal;

import PathConstants from "../../routes/pathConstants";
import { CREATE_CHATBOX_MUTATION } from "../../containers/graphql";
import styles from "./postLayout.module.css";

import PropTypes from "prop-types";

// ref: viewPostPage.js

// // me: toolNo == 3: edit remove save
// // not me: toolNo == 1: save
// const ToolBox = styled.div`
//   width: ${({ me }) => (me ? "150px" : "50px")};
//   // width: '150px';
//   height: 50px;
//   margin-top: 40px;
//   display: flex;
// `;

const MyIconButton = styled(IconButton)`
  box-sizing: border-box !important;
  width: 50px !important;
  height: 50px !important;
  margin-right: 0px !important;
  display: flex !important;
  justify-content: center !important;
`;

// const InformationItem = styled(Typography)`
//   display: flex !important;
//   justify-content: start;
//   left: 5px;
//   position: relative;
// `;

// const InformationBox = styled(Grid)`
//   position: relative;
//   left: 30px;
// `;

// const NameButton = styled(Buttonm)`
//   color: #20b2aa !important;
//   margin-top: 1vh !important;
//   font-size: 22px !important;
//   display: flex !important;
// `;

const PostLayout = ({
  post,
  handleFollowPost,
  handleEditPost,
  handleDeletePost,
}) => {
  // console.log("PostLayout:", post);
  const { userId, account, authenticated } = useOutsider();

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const [info, setInfo] = useState(null);
  const [me, setMe] = useState(true);
  // const [me, setMe] = useState(false);
  const navigate = useNavigate();
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);

  // useEffect(() => {
  //   setMe(post.author._id === userId);
  //   // console.log("My post:", post.author.name, post.author._id === userId);
  // }, [setMe, post.author._id, userId]);

  const ShowDeletePostModal = () => {
    confirm({
      title: "Do you Want to delete the post?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        console.log("OK");
        handleDeletePost(post._id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleChat = async () => {
    console.log("handle chat");
    if (post.author._id === userId) {
      navigate(PathConstants.MY_PROFILE);
    } else {
      const box = await createChatBox({
        variables: {
          name: userId,
          to: post.author._id,
        },
      });
      navigate(PathConstants.MAIL, {
        state: {
          PosterId: post.author._id,
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
          <Typography paragraph className="content" align="left">
            {post.content}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const AdmittedAction = () =>
    authenticated && (
      <div className={`${styles.actions} ${me ? styles.actionsMe : null}`}>
        {me ? (
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
              <IconButton aria-label="edit" onClick={handleEditPost}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
        <Tooltip
          title="follow / unfollow"
          placement="top"
          arrow
          className={styles.actionButton}
        >
          <IconButton
            aria-label="save"
            onClick={() => handleFollowPost(post._id)}
          >
            <DataSaverOnIcon />
          </IconButton>
        </Tooltip>
      </div>
    );

  return (
    <Card className={styles.container}>
      <CardContent>
        <div className={styles.header}>
          <Typography gutterBottom className={styles.title}>
            {post.title}
          </Typography>
          <AdmittedAction />
        </div>
        <Divider />
        <Button className={styles.name} onClick={() => handleChat()}>
          {post.author.name}
        </Button>
        <Description />
      </CardContent>
    </Card>
  );
};

PostLayout.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    teacherName: PropTypes.string,
    classNo: PropTypes.string,
    deadline: PropTypes.string, // PropTypes.instanceOf(Date),
    condition: PropTypes.number,
    tag: PropTypes.array,
    content: PropTypes.string,
    author: PropTypes.object,
  }),
  handleFollowPost: PropTypes.func,
  handleEditPost: PropTypes.func,
  handleDeletePost: PropTypes.func,
};

export default PostLayout;
