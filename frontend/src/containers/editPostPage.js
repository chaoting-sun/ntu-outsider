import React from 'react'
import '../css/editPostPage.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Input, Tooltip } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { StylesProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Tag from "../components/tag";
import { useOusider } from './hooks/useOusider';
import { CREATE_POST_MUTATION, UPDATE_POST_MUTATION } from './graphql/mutation';
import { useMutation } from '@apollo/client';

const { TextArea } = Input;

//reference: https://codesandbox.io/s/react-hook-form-get-started-j5wxo?file=/src/index.js:0-1102

const PostCard = styled(Card)`
  position: relative;
  top: -15vh;
  
`

const Content = styled(TextArea)`
  margin-top: 5vh; 
  width: 100%;
  font-size: 18px;
  padding: 1vh 2vh; 
`

const NameButton = styled(Button)`
  {
    color: #20B2AA !important;
    margin-top:6vh !important;
    font-size: 22px !important;
    display: flex !important;
    left: 6.5vh !important;
  }
`

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

const EditPostPage = () => {
  const { username, userId, displayStatus } = useOusider();
  const [action, setAction] = useState('');
  const [updatedPost, setUpdatedPost] = useState(null);
  const [sentPost, setSentPost] = useState(false);
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  console.log("username:", username);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (location.state !== null) {
      setAction(location.state.action);
      setPost(post);
      setTags(post ? post.tag : []);
      setPostId(location.state._id);
    }
  }, [location])


  const onSubmit = async (data) => {
    console.log(data);
    console.log(tags);

    if (action === 'createPost') {
      const updatedPost = await createPost({
        variables: {
          userId: userId,
          title: data.title,
          classNo: data.classNo,
          className: data.className,
          teacherName: data.teacherName,
          content: data.content,
          condition: data.condition,
          deadline: data.dealine,
          tag: tags
        }
      })
    } else if (action === 'editPost') {
      const updatedPost = await updatePost({
        variables: {
          postId: postId,
          title: data.title,
          classNo: data.classNo,
          className: data.className,
          teacherName: data.teacherName,
          content: data.content,
          condition: data.condition,
          deadline: data.dealine,
          tag: tags
        }
      })
    }

    if (updatedPost) {
      displayStatus({
        'type': 'sucess',
        'msg': 'successful to save post!',
      })
      setUpdatedPost(updatedPost);
      setSentPost(true);
    } else {
      displayStatus({
        'type': 'fail',
        'msg': 'fail to save post!',
      })
    }
  }; // your form submit function which will invoke after successful validation

  useEffect(() => {
    if (sentPost) {
      navigate(-1, { variables: updatedPost });
    }
  }, [sentPost])

  useEffect(() => {
    if (sentPost) {
      navigate("..", {
        state: {
          actionType: 'edit',
          postInfo: updatedPost,
        }
      }); //use mutation; 傳入該篇文章資料
      setSentPost(false);
    }
  }, [sentPost])

  //console.log(watch("example")); // you can watch individual input by pass the name of the input


  return (
    <div className="editPostPageContainer">
      <StylesProvider injectFirst>
        {console.log('post:', post)}
        <PostCard sx={{ minWidth: 500 }}>
          <CardContent>
            <NameButton>{username}</NameButton>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue={post ? post.title : null}
                placeholder="Title"
                className='titleInput'
                {...register("title", { required: "Title is required" })}
              />
              {errors.title ? <p className='error'>{errors.title.message}</p> : null}
              {/* include validation with required or other standard HTML validation rules */}
              <div className='inputItem'>
                <label>課名 </label>
                <input
                  defaultValue={post ? post.className : null}
                  className="detailInput"
                  {...register("class", { required: "Class name is required" })}
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.class ? <p className='error'>{errors.class.message}</p> : null}
              <div className='inputItem'>
                <label>授課老師 </label>
                <input
                  defaultValue={post ? post.teacherName : null}
                  className="detailInput"
                  {...register("teacher", { required: "Teacher name is required" })}
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.teacher ? <p className='error'>{errors.teacher.message}</p> : null}
              <div className='inputItem'>
                <label>課程流水號 </label>
                <input
                  defaultValue={post ? post.classNo : null}
                  className="detailInput"
                  {...register("classNo", { required: "Class number is required" })}
                />
              </div>
              {errors.classNo ? <p className='error'>{errors.classNo.message}</p> : null}
              <div className='inputItem'>
                <label>尚須徵求人數 </label>
                <input
                  defaultValue={post ? post.condition : null}
                  type="number"
                  min="0"
                  className="detailInput"
                  {...register("remainder")}
                />
              </div>
              <div className='inputItem'>
                <label> 截止時間 </label>
                <input
                  value={post ? post.deadline.split(" ")[0] : null}
                  type="date"
                  className="timeInput"
                  {...register("endDate")}
                /> &nbsp;
                <input
                  value={post ? post.deadline.split(" ")[1] : null}
                  type="time"
                  className="timeInput"
                  {...register("endTime")}
                />
              </div>
              <Content
                defaultValue={post ? post.content : null}
                rows={12}
              />
              <Tag tags={tags} setTags={setTags} />
              <input type="submit" />
            </form>
          </CardContent>

          {/*<CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>*/}
        </PostCard>
      </ StylesProvider>
    </div>
  )
}
export default EditPostPage

