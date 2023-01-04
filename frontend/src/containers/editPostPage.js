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

const updatePost = async (
  postId, title, classNo, className, teacherName,
  content, condition, deadline, tag
) => {
  return {
    postId, title, classNo, className, teacherName,
    content, condition, deadline, tag
  } 
}

const EditPostPage = ({info, fetchEditedPost}) => {
  const { username } = useOusider()
  const [tags, setTags] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});
  const [sendPost, setSendPost] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(tags);
    
    const postDoc = await updatePost(
      data.postId,
      data.title,
      data.classNo,
      data.className,
      data.teacherName,
      data.content,
      data.condition,
      `${data.endDate} ${data.endTime}`,
      tags
    )

    data.deadline = `${data.endDate} ${data.endTime}`
    fetchEditedPost(data);
    setUpdatedPost(postDoc);
    setSendPost(true);
  }; // your form submit function which will invoke after successful validation

  // useEffect(() => {
  //   console.log('state:', state);
  //   console.log("test state endDate:", state.endDate);
  // }, [])

  useEffect(() => {
    if (sendPost) {
      navigate("..", { 
        state: {
          actionType: 'edit',
          postInfo: updatedPost,
        } 
      }); //use mutation; 傳入該篇文章資料
      // setPostSent(false);
    }
  }, [sendPost])

  //console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <StylesProvider injectFirst>
        <PostCard sx={{ minWidth: 500 }}>
          <CardContent>
            <NameButton>{username}</NameButton>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue={info.title}
                placeholder="Title"
                className='titleInput'
                {...register("title", { required: "Title is required" })}
              />
              {errors.title ? <p className='error'>{errors.title.message}</p> : null}
              {/* include validation with required or other standard HTML validation rules */}
              <div className='inputItem'>
                <label>課名 </label>
                <input
                  defaultValue={info.className}
                  className="detailInput"
                  {...register("class", { required: "Class name is required" })}
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.class ? <p className='error'>{errors.class.message}</p> : null}
              <div className='inputItem'>
                <label>授課老師 </label>
                <input
                  defaultValue={info.teacherName}
                  className="detailInput"
                  {...register("teacher", { required: "Teacher name is required" })}
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.teacher ? <p className='error'>{errors.teacher.message}</p> : null}
              <div className='inputItem'>
                <label>課程流水號 </label>
                <input
                  defaultValue={info.classNo}
                  className="detailInput"
                  {...register("classNo", { required: "Class number is required" })}
                />
              </div>
              {errors.classNo ? <p className='error'>{errors.classNo.message}</p> : null}
              <div className='inputItem'>
                <label>尚須徵求人數 </label>
                <input
                  defaultValue={info.condition}
                  type="number"
                  min="0"
                  className="detailInput"
                  {...register("remainder")}
                />
              </div>
              <div className='inputItem'>
                <label> 截止時間 </label>
                <input
                  value={info.deadline.split(" ")[0]}
                  type="date"
                  className="timeInput"
                  {...register("endDate")}
                /> &nbsp;
                <input
                  value={info.deadline.split(" ")[1]}
                  type="time"
                  className="timeInput"
                  {...register("endTime")}
                />
              </div>
              <Content
                defaultValue={info.content}
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
  )
}
export default EditPostPage

