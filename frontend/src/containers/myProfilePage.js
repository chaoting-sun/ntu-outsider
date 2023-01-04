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
import '../css/mainPage.css'
import { USER_QUERY } from './graphql/query';
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { hashPassword } from '../utils/hash';
import {
  UPDATE_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION
} from './graphql/mutation';

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

const ValidateButton = styled(Button)`
  {
    color: #20B2AA !important;
    font-size: 14px !important;
    display: flex !important;
    margin-right: 0px !important;
    padding: 0px !important;
    width: 5px !important;
  }
`

const SendButton = styled(Button)`
  {
    margin-top:15px !important;
    font-size: 25px !important;
    display: flex !important;
    justify-content: center !important;
    bottom: 5vh !important;
    left: 80% !important;
    width: 90px !important;
    height: 50px !important;
  }
`

const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const MyProfilePage = () => {
  const { userId, username, account, setUsername, setAccount, 
    displayStatus, preferTags, setPreferTags, authenticated } = useOusider();
  const [tags, setTags] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [queryUser, { data: UserByQuery, loading }] = useLazyQuery(USER_QUERY);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);

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

  useEffect(() => {
    if (!authenticated) navigate('/logIn');
  }, [])

  const onSubmit = async (data) => {
    console.log('data:', data);
    const user = await updateUser(userId, data.username, data.account);

    if (user) {
      setUsername(watch("username"));
      setAccount(watch("account"));
      setPreferTags(tags);

      displayStatus({
        type: 'success',
        msg: 'save profile successfully!'
      })
    } else {
      displayStatus({
        type: 'fail',
        msg: 'Your account has been used!'
      })
    }
  }; // your form submit function which will invoke after successful validation

  const onError = () => {
  }; // your form submit function which will invoke after successful validation

  const handleValidatePassword = async () => {
    if (watch('password') === "") {
      displayStatus({
        "type": "fail",
        "msg": "Please enter password!"
      })
    } else {
      const hashedPassword = hashPassword(watch("password"));
      await queryUser(watch("account"), hashedPassword);
    }
  }

  useEffect(() => {
    if (UserByQuery === undefined) return;
    if (UserByQuery !== null) {
      setValidated(true);
      displayStatus({
        "type": "success",
        "msg": "Validated password!"
      })
    } else {
      displayStatus({
        "type": "success",
        "msg": "Validation failed!"
      })
    }
  }, [UserByQuery])

  const handleInputNewPassword = async () => {
    if (watch('newPassword') === "") {
      displayStatus({
        "type": "fail",
        "msg": "Please enter new password"
      })
    } else {
      const hashedPassword = hashPassword(watch("password"));
      const hashedNewPassword = hashPassword(watch("newPassword"));

      const res = await updatePassword(userId, hashedPassword, hashedNewPassword);
      if (res) {
        displayStatus({
          "type": "fail",
          "msg": "Update password successfully!"
        })
      } else {
        displayStatus({
          "type": "fail",
          "msg": "Fail to update password!"
        })
      }
    }
  }

  return (
    <>
      <StylesProvider injectFirst>
        <div className='myProfilePageContainer'>
          <PostCard sx={{ minWidth: 500, width: 850 }} style={{ height: 560 }}>
            <CardContent>
              <NameButton>個人資訊</NameButton>
              <form className="profileFormSize">
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
                  <div className="subInputItem">
                    <label>使用者帳號 </label>
                    <input
                      {...register("userAccount", { required: "User  is required" })}
                      defaultValue={account}
                      className="detailInput" />
                  </div>
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
                  <ValidateButton onClick={handleValidatePassword}>確認密碼</ValidateButton>
                </div>
                {errors.password ? <p className='error'>{errors.password.message}</p> : null}
                {
                  validated ?
                    <div className='inputItem'>
                      <label>使用者密碼 </label>
                      <input {...register("newPassword")}
                        type="password"
                        className="detailInput"
                      />
                      <ValidateButton onClick={handleInputNewPassword}>輸入新密碼</ValidateButton>
                    </div> : null
                }
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