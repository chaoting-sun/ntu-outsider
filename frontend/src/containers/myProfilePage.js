import React from 'react'
import '../css/myProfilePage.css'
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
import { useOusider } from "./hooks/useOusider";
import { userExamples } from './db'
import PostLayout from '../components/postLayout'
import '../css/mainPage.css'


const { TextArea } = Input;

const PostCard = styled(Card)`
  width: 80% !important;
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
    margin-top:3vh !important;
    font-size: 35px !important;
    display: flex !important;
    left: 3vh !important;
  }
`
const SendButton = styled(Button)`
  {
    margin-top:3vh !important;
    font-size: 25px !important;
    display: flex !important;
    position: relative;
    bottom: 5vh !important;
    left: 80% !important;
  }
`

const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

/* graphql query */
const updateUser = async (userId, name, account) => {
  return userExamples.slice(0, 1)[0];
}

const MyProfilePage = () => {
  const { userId, username, 
    account, setUsername, 
    setAccount, displayStatus,
    preferTags, setPreferTags } = useOusider();
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
     if (preferTags.length)
      setTags(preferTags)
  }, [])

  const onSubmit = async (data) => {
    console.log('data:', data);
    const user = await updateUser(
      userId,
      data.username,
      data.account
    );
    setUsername(data.username);
    setAccount(data.account);
    setPreferTags(tags);

    if (user !== null) {
      displayStatus({
        type: 'success',
        msg: 'save profile successfully!'
      })
    } else {
      displayStatus({
        type: 'fail',
        msg: 'fail to save profile!'
      })
    }

    // navigate("/viewPostPage"); //use mutation; 傳入該篇文章資料

  }; // your form submit function which will invoke after successful validation

  const onError = () => {
    console.log("wrong");
    // navigate("/viewPostPage"); //use mutation; 傳入該篇文章資料

  }; // your form submit function which will invoke after successful validation


  return (
    <>
      <StylesProvider injectFirst>
        <div className='myProfilePageContainer'>
          <PostCard sx={{ minWidth: 500, width: 850 }} style={{ height: 560 }}>
            <CardContent>
              <NameButton>個人資訊</NameButton>
              <form>
                {/* include validation with required or other standard HTML validation rules */}
                <div className='inputItem'>
                  <label>使用者名稱 </label>
                  <input 
                    {...register("username", { required: "Username is required" })} 
                    defaultValue={username} 
                    className="detailInput"
                  />
                </div>
                {/* errors will return when field validation fails  */}
                {errors.userName ? <p className='error'>{errors.userName.message}</p> : null}
                <div className='inputItem'>
                  <label>使用者帳號 </label>
                  <input
                    {...register("userAccount", { required: "User  is required" })}
                    defaultValue={account}
                    className="detailInput" />
                </div>
                {/* errors will return when field validation fails  */}
                {errors.userAccount ? <p className='error'>{errors.userAccount.message}</p> : null}
                <div className='inputItem'>
                  <label>使用者密碼 </label>
                  <input {...register("password",
                    { required: "Password is required" })}
                    type="password"
                    className="detailInput"
                  />
                </div>
                {errors.password ? <p className='error'>{errors.password.message}</p> : null}
                {/* <div className='inputItem'>
                  <label>確認密碼&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input {...register("passwordCheck", { required: "Class number is required" })} type="password" className="detailInput" />
                </div>
                {errors.password ? <p className='error'>{errors.password.message}</p> : null} */}
                <div className='inputItem'>
                  <label>偏好設定&nbsp;&nbsp;</label>
                  <Tag tags={tags} setTags={setTags} />
                </div>
                {/* <input type="submit" className="profileSubmit" onSubmit={(e) => handleSubmit(onSubmit, onError)(e)}/> */}
              </form>
              {/* <div className='profileSubmit'>
                <input type="submit" />
              </div> */}
            </CardContent>
            <SendButton
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#919090',
                ':hover': {
                  backgroundColor: '#878484'
                },
                ':focus': {
                  border: 'none'
                }
              }}
              onClick={(e) => handleSubmit(onSubmit, onError)(e)}
            >
              更新
            </SendButton>
          </PostCard>
        </div>
      </ StylesProvider>
    </>
  )
}

export default MyProfilePage;