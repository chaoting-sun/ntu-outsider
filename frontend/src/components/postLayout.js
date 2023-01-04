import React, { useState, useEffect } from 'react'
import '../css/viewPostPage.css'
import '../css/PostLayout.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Buttonm from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { Input } from 'antd';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Button, Modal, Space, Tag } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { useOusider } from '../containers/hooks/useOusider';

// ref: viewPostPage.js

const { confirm } = Modal;
const { TextArea } = Input;


const PostCard = styled(Card)`
  width: 700px;
  position: relative;
  top: -15vh;
  border-radius: 10px !important;
  cursor: pointer;
`

// me: toolNo == 3: edit remove save
// not me: toolNo == 1: save
const ToolBox = styled.div`
  width: ${({ me }) => me ? '150px' : '50px'};
  // width: '150px';
  height: 50px;
  margin-top: 40px;
  display: flex;
`

const MyIconButton = styled(IconButton)`
  box-sizing: border-box !important;
  width: 50px !important;
  height: 50px !important;
  margin-right: 0px !important;
  display: flex !important;
  justify-content: center !important;
`

const InformationItem = styled(Typography)`
  display: flex !important;
  justify-content: start;
  left: 5px;
  position:relative;
`

const InformationBox = styled(Grid)`
  position: relative;
  left: 30px;
`

const NameButton = styled(Buttonm)`
  color: #20B2AA !important;
  margin-top:1vh !important;
  font-size: 22px !important;
  display: flex !important;
  left: 3vh !important;
`
/*
postId={post._id}
posterName={post.author.name}
posterAccount={post.author.account}
title={post.title}
classNo={post.classNo}
className={post.className}
teacherName={post.teacherName}
content={post.content}
condition={post.condition}
deadline={post.deadline}
tags={post.tags}
handleEditPost={handleEditPost}
*/

const deletePost = async () => {
  return "successfully delete post";
}

const savePost = async () => {
  return "successfully save post";
}

const PostLayout = ({ post, handlePostOperation }) => {
  const { account, authenticated } = useOusider();
  const [info, setInfo] = useState(null);
  const [me, setMe] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    console.log("post->", post);
    setInfo(post);
  }, []);

  useEffect(() => {
    console.log("info->lll", info);
    if (info) setMe(info.author.account === account);
  }, [info])

  const ShowDeletePostModal = () => {
    confirm({
      title: 'Do you Want to delete the post?',
      icon: <ExclamationCircleFilled />,
      content: '',
      onOk() {
        console.log('OK');
        deletePost().then((value) => {
          console.log(value)
          handlePostOperation(info._id, 'delete');
        }).catch((e) => {
          console.log(e);
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const EditPost = () => {
    handlePostOperation(info._id, 'edit');
  }

  const SavePost = () => {
    savePost().then((value) => {
      console.log(value)
      handlePostOperation(info._id, 'delete');
    }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <div className='editPostPageContainer'>
      {
        info === null ? null :
          <PostCard sx={{ minWidth: 400 }}>
            {console.log('info:', info)}
            <ButtonBase
            // className={props.classes.cardAction}
            // onClick={event => { ... }}
            >
              <CardContent>
                <div className="cardHeader">
                  <Typography
                    sx={{
                      fontSize: 28,
                      display: "flex",
                      position: "relative",
                      left: 30,
                      marginTop: 5
                    }}
                    gutterBottom
                  >
                    {info.title}
                  </Typography>
                  {
                    authenticated ? (
                      <ToolBox me={me}>
                        {
                          me ? (
                            <>
                              <MyIconButton
                                aria-label="delete"
                                onClick={ShowDeletePostModal}
                              >
                                <DeleteIcon />
                              </MyIconButton>
                              <MyIconButton
                                aria-label="edit"
                                onClick={EditPost}
                              >
                                <EditIcon />
                              </MyIconButton>
                            </>
                          ) : null
                        }
                        <MyIconButton aria-label="save" onClick={SavePost}>
                          <DataSaverOnIcon />
                        </MyIconButton>
                      </ToolBox>
                    ) : null
                  }
                </div>
                <Divider />
                <NameButton>{info.author.info}</NameButton>
                <InformationBox item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <InformationItem variant="subtitle1">
                      {info.className}
                    </InformationItem>
                    <InformationItem variant="body2" color="text.secondary">
                      授課老師： {info.teacherName}
                    </InformationItem>
                    <InformationItem variant="body2" color="text.secondary">
                      流水號： {info.classNo}
                    </InformationItem>
                    <InformationItem variant="body2" color="text.secondary">
                      截止時間： {info.deadline}
                    </InformationItem>
                    <InformationItem variant="body2" color="text.secondary">
                      剩餘徵求名額： {info.condition}
                    </InformationItem>
                    <div className='tags'>
                      {info.tags.map(e => (
                        <Tag key={e} color="processing"> {e} </Tag>
                      ))}

                    </div>
                  </Grid>
                  <Grid item>
                    <Typography paragraph className='content' align="left">
                      {info.content}
                    </Typography>
                  </Grid>
                </InformationBox>
              </CardContent>
            </ButtonBase>
          </PostCard>
      }
    </div>
  )
}




// const PostLayout1 = ({ postAuthor, postTitle, teacherName, tags }) => {

//   return (
//     <div className="postContainer">

//       <div className="postAuthorBlock">postTitle</div>
//       <div className="postTitleBlock">postTitle</div>
//       <div className="teacherNameBlock">teacherName</div>
//       {
//         tags.map((tag) => (
//           <div className="tagsBlock">


//           </div>
//         ))

//       }
//     </div>
//   )
// }

export default PostLayout;