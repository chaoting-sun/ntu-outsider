import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "antd";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, Space, Tag } from "antd";
import { useQuery, useMutation } from "@apollo/client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Buttonm from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { ExclamationCircleFilled } from "@ant-design/icons";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { useOutsider } from "../containers/hooks/useOutsider";
import Tooltip from "@mui/material/Tooltip";

import PathConstants from "../routes/pathConstants";
import { CREATE_CHATBOX_MUTATION } from "../containers/graphql";
import "../css/viewPostPage.css";
import "../css/PostLayout.css";

// ref: viewPostPage.js

const { confirm } = Modal;
const { TextArea } = Input;

const PostCard = styled(Card)`
  width: 100% important!;
  position: relative;
  top: -15vh;
  border-radius: 10px !important;
`;

// me: toolNo == 3: edit remove save
// not me: toolNo == 1: save
const ToolBox = styled.div`
  width: ${({ me }) => (me ? "150px" : "50px")};
  // width: '150px';
  height: 50px;
  margin-top: 40px;
  display: flex;
`;

const MyIconButton = styled(IconButton)`
  box-sizing: border-box !important;
  width: 50px !important;
  height: 50px !important;
  margin-right: 0px !important;
  display: flex !important;
  justify-content: center !important;
`;

const InformationItem = styled(Typography)`
  display: flex !important;
  justify-content: start;
  left: 5px;
  position: relative;
`;

const InformationBox = styled(Grid)`
  position: relative;
  left: 30px;
`;

const NameButton = styled(Buttonm)`
  color: #20b2aa !important;
  margin-top: 1vh !important;
  font-size: 22px !important;
  display: flex !important;
`;

const PostLayout = ({
  post,
  handleSavePost,
  handleEditPost,
  handleDeletePost,
}) => {
  // console.log("PostLayout:", post);

  const { userId, account, authenticated } = useOutsider();
  const [info, setInfo] = useState(null);
  const [me, setMe] = useState(false);
  const navigate = useNavigate();
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setMe(post.author._id === userId);
    // console.log("My post:", post.author.name, post.author._id === userId);
  }, []);

  const ShowDeletePostModal = () => {
    confirm({
      title: "Do you Want to delete the post?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        console.log("OK");
        handleDeletePost(post);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleChat = async () => {
    if (post.author._id === userId) {
      navigate(PathConstants.MY_PROFILE);
    } else {
      const box = await createChatBox({
        variables: {
          name: userId,
          to: post.author._id,
        },
      });
      console.log(box);
      //console.log(userId, post.author._id );
      //console.log(box.data.createChatBox);
      console.log("layout");
      navigate(PathConstants.MAIL, {
        state: {
          PosterId: post.author._id,
          Box: box.data.createChatBox,
        },
      });
    }
  };

  const EditPost = async () => {
    await handleEditPost(post);
  };
  const SavePost = async () => {
    await handleSavePost(post);
  };

  return (
    <PostCard sx={{ minWidth: 600, maxWidth: 800 }}>
    {/* <PostCard sx={{ maxWidth: 800 }}> */}
    <CardContent>
        <div className="cardHeader">
          <Typography
            sx={{
              fontSize: 28,
              display: "flex",
              position: "relative",
              left: 30,
              marginTop: 5,
            }}
            gutterBottom
          >
            {post.title}
          </Typography>
          {authenticated ? (
            <ToolBox me={me}>
              {me ? (
                <>
                  <Tooltip title="delete" placement="top" arrow>
                    <MyIconButton
                      aria-label="delete"
                      onClick={ShowDeletePostModal}
                    >
                      <DeleteIcon />
                    </MyIconButton>
                  </Tooltip>
                  <Tooltip title="edit" placement="top" arrow>
                    <MyIconButton aria-label="edit" onClick={EditPost}>
                      <EditIcon />
                    </MyIconButton>
                  </Tooltip>
                </>
              ) : null}
              <Tooltip title="follow / unfollow" placement="top" arrow>
                <MyIconButton aria-label="save" onClick={SavePost}>
                  <DataSaverOnIcon />
                </MyIconButton>
              </Tooltip>
            </ToolBox>
          ) : null}
        </div>
        <Divider />
        <NameButton onClick={() => handleChat()}>{post.author.name}</NameButton>
        <InformationBox item xs container direction="column" spacing={1}>
          <Grid item xs>
            <InformationItem variant="subtitle1">
              {post.className}
            </InformationItem>
            <InformationItem variant="body2" color="text.secondary">
              授課老師： {post.teacherName}
            </InformationItem>
            <InformationItem variant="body2" color="text.secondary">
              流水號： {post.classNo}
            </InformationItem>
            <InformationItem variant="body2" color="text.secondary">
              截止時間： {post.deadline}
            </InformationItem>
            <InformationItem variant="body2" color="text.secondary">
              剩餘徵求名額： {post.condition}
            </InformationItem>
            <div className="tags">
              {post.tag.map((e) => (
                <Tag key={e} color="processing">
                  {" "}
                  {e}{" "}
                </Tag>
              ))}
            </div>
          </Grid>
          <Grid item>
            <Typography paragraph className="content" align="left">
              {post.content}
            </Typography>
          </Grid>
        </InformationBox>
      </CardContent>
    </PostCard>
  );
};

export default PostLayout;
