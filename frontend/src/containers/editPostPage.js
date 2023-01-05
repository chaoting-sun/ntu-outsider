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

// set default value of the form for useFrom
// ref: https://stackoverflow.com/questions/70663158/set-default-values-in-react-hook-form

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
  const { username, userId, displayStatus, authenticated } = useOusider();
  const [action, setAction] = useState('');
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

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
      }
      reset({...defaultValues});

    }
  }, [location])


  const onSubmit = async (data) => {
    // console.log("onSubmit:");
    // console.log(data);

    let outData = null;

    if (action === 'createPost') {
      const vars = {
        userId: userId,
        title: data.title,
        classNo: data.classNo,
        className: data.className,
        teacherName: data.teacherName,
        content: content,
        condition: Number(data.condition),
        deadline: `${data.endDate} ${data.endTime}`,
        tag: tags
      }
      // console.log('createPost - vars:', vars);
      outData = await createPost({ variables: vars });
    } else if (action === 'editPost') {
      const vars = {
        postId: post._id,
        title: data.title,
        classNo: data.classNo,
        className: data.className,
        teacherName: data.teacherName,
        content: content,
        condition: Number(data.condition),
        deadline: `${data.endDate} ${data.endTime}`,
        tag: tags
      }
      // console.log('updatePost - vars:', vars);
      outData = await updatePost({ variables: vars });
    }

    // console.log('updatedPost:', outData.data.createPost);

    if (outData) {
      displayStatus({
        'type': 'success',
        'msg': 'create a post!',
      })
      setUpdatedPost(outData.data.createPost);
      setFinishEdit(true);
    } else {
      displayStatus({
        'type': 'fail',
        'msg': 'fail to save post!',
      })
    }
  }; // your form submit function which will invoke after successful validation

  useEffect(() => {
    if (finishEdit) {
      navigate(-1, {
        state: {
          action: 'edit',
          post: updatedPost,
        }
      }); //use mutation; 傳入該篇文章資料
      setFinishEdit(false);
    }
  }, [finishEdit])

  //console.log(watch("example")); // you can watch individual input by pass the name of the input



  return (
    !authenticated ? null :
      <div className="editPostPageContainer">
        <StylesProvider injectFirst>
          <PostCard sx={{ minWidth: 500 }}>
            <CardContent>
              <NameButton>{username}</NameButton>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue={post ? post.title : ""}
                  placeholder="Title"
                  className='titleInput'
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title ? <p className='error'>{errors.title.message}</p> : null}
                {/* include validation with required or other standard HTML validation rules */}
                <div className='inputItem'>
                  <label>課名 </label>
                  <input
                    defaultValue={post ? post.className : ""}
                    className="detailInput"
                    {...register("className", { required: "Class name is required" })}
                  />
                </div>
                {/* errors will return when field validation fails  */}
                {errors.class ? <p className='error'>{errors.class.message}</p> : null}

                <div className='inputItem'>
                  <label>授課老師 </label>
                  <input
                    defaultValue={post ? post.teacherName : ""}
                    className="detailInput"
                    {...register("teacherName", { required: "Teacher name is required" })}
                  />
                </div>
                {/* errors will return when field validation fails  */}
                {errors.teacher ? <p className='error'>{errors.teacher.message}</p> : null}

                <div className='inputItem'>
                  <label>課程流水號 </label>
                  <input
                    defaultValue={post ? post.classNo : ""}
                    className="detailInput"
                    {...register("classNo", { required: "Class number is required" })}
                  />
                </div>

                {errors.classNo ? <p className='error'>{errors.classNo.message}</p> : null}
                <div className='inputItem'>
                  <label>尚須徵求人數 </label>
                  <input
                    defaultValue={post ? post.condition : ""}
                    type="number"
                    min="0"
                    className="detailInput"
                    {...register("condition")}
                  />
                </div>
                <div className='inputItem'>
                  <label> 截止時間 </label>
                  <input
                    // value={}
                    defaultValue={post ? post.deadline.split(" ")[0] : ""}
                    type="date"
                    className="timeInput"
                    {...register("endDate")}
                  /> &nbsp;
                  <input
                    // value={}
                    defaultValue={post ? post.deadline.split(" ")[1] : ""}
                    type="time"
                    className="timeInput"
                    {...register("endTime")}
                  />
                </div>
                <Content
                  value={content}
                  defaultValue={post ? post.content : ""}
                  rows={12}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Tag tags={tags} setTags={setTags} />
                <input 
                  className="formInput"
                  type="submit" 
                />
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

