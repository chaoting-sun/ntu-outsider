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
import { Navigate, useNavigate } from 'react-router-dom';
import { StylesProvider } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Tag from "../components/tag";

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


export default () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(tags);
    navigate("/viewPostPage"); //use mutation; 傳入該篇文章資料

  }; // your form submit function which will invoke after successful validation

  //console.log(watch("example")); // you can watch individual input by pass the name of the input
  
  return (
    <StylesProvider injectFirst>
      <div className='editPostPageContainer'>
          <PostCard sx={{ minWidth: 500 }}>
              <CardContent>
                <NameButton>me.name</NameButton>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input {...register("title", { required: "Title is required"})}  placeholder = "Title" className='titleInput' />
                  {errors.title ? <p className='error'>{errors.title.message}</p>: null}
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className='inputItem'>
                    <label>課名 </label>
                    <input {...register("class", { required: "Class name is required"})} className = "detailInput"/>
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.class ? <p className='error'>{errors.class.message}</p>: null}
                  <div className='inputItem'>
                    <label>授課老師 </label>
                    <input {...register("teacher", { required: "Teacher name is required"})} className = "detailInput"/>
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.teacher ? <p className='error'>{errors.teacher.message}</p>: null}
                  <div className='inputItem'>
                    <label>課程流水號 </label>
                    <input {...register("classNo", { required: "Class number is required"})} className = "detailInput"/>
                  </div>
                  {errors.classNo ? <p className='error'>{errors.classNo.message}</p>: null}
                  <div className='inputItem'>
                    <label>尚須徵求人數 </label>
                    <input {...register("remainder")} type = "number" min = "0" className = "detailInput"/>
                  </div>
                  <div className='inputItem'>
                    <label> 截止時間 </label>
                    <input {...register("endDate")} type = "date" className = "timeInput"/> &nbsp;
                    <input {...register("endTime")} type = "time" className = "timeInput"/>
                  </div>
                  <Content rows={12} />
                  <Tag tags = {tags} setTags = {setTags}/>
                  <input type="submit" />
                </form>
              </CardContent>
              
              {/*<CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>*/}
          </PostCard>
      </div>
    </ StylesProvider>
  )
}







