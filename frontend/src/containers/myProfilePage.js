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
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { hashPassword } from '../utils/hash';
import {
  UPDATE_PASSWORD_MUTATION,
  UPDATE_USER_MUTATION,
  USER_QUERY
} from './graphql/index';

const { TextArea } = Input;

const PostCard = styled(Card)`
  width: 80% !important;
  top: -15vh;
`

const Title = styled.div`
  {
    color: #20B2AA !important;
    margin-top:3vh !important;
    margin-left:5vh !important;
    margin-bottom: 3vh;
    font-size: 30px !important;
    display: flex !important;
    font-weight: 500;
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
    margin-top:20px !important;
    font-size: 15px !important;
    display: flex !important;
    justify-content: center !important;
    padding: 5px !important; 
    /*bottom: 5vh !important;*/
    left: 50% !important;
    width: 15% !important;
    height: 40px !important;
    position:relative;
    border-radius: 15px !important;
  }
`

const SendButton2 = styled(Button)`
  {
    margin-top:20px !important;
    font-size: 15px !important;
    display: flex !important;
    justify-content: center !important;
    padding: 5px !important; 
    /*bottom: 5vh !important;*/
    left: 35% !important;
    width: 15% !important;
    height: 40px !important;
    position:relative;
    border-radius: 15px !important;
  }
`

const FormContainer = styled.div`
  display:flex;
  flex-direction: column; 
  width: 80%; 
`

const ProfileForm = styled.form`
  width: 80%;  
`

const PasswordForm = styled.form`
  margin-top: 20px;
`

const SecretTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  display: flex;
  margin-left:1vh;
  margin-bottom: 1vh;
`

const MyProfilePage = () => {
  const { userId, username, account, setUsername,
    setAccount, displayStatus, authenticated } = useOusider();
  
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [queryUser, { data: UserByQuery, loading }] = useLazyQuery(USER_QUERY);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);
  //console.log(account);
  //console.log(username);
  const form1 = useForm()
  const form2 = useForm()

  


  //const form1 = useForm({ name: 'form1' });

  useEffect(() => {
    if (!authenticated) navigate('/logIn');
  }, [])
  
  //更改name, account
  const onSubmit1 = async (data) => {
    console.log('data:', data);
    const user = await updateUser({variables: {
      userId,
      name: data.username,
      account: data.userAccount
    }});
    console.log(user);

    if (user) {
      setUsername(form1.watch("username"));
      setAccount(form1.watch("userAccount"));

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

  const handleValidatePassword = (data) => {
    if (form2.watch('password') === "") {
      displayStatus({
        "type": "fail",
        "msg": "Please enter password!"
      })
    } else {
      //const hashedPassword = hashPassword(data.password);
      //console.log(hashedPassword);
      queryUser({
        variables: {password: data.password, account}, 
      });
    }

    
  }
  console.log(UserByQuery);
  const onSubmit2 = async(data) => {
    //console.log(data);
    handleValidatePassword(data);
    
    //handleInputNewPassword(data)
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
    if (form2.watch('newPassword') === "") {
      displayStatus({
        "type": "fail",
        "msg": "Please enter new password"
      })
    } else {
      const hashedPassword = hashPassword(form2.watch("password"));
      const hashedNewPassword = hashPassword(form2.watch("newPassword"));

      const res = await updatePassword(userId, hashedPassword, hashedNewPassword);
      if (res) {
        displayStatus({
          "type": "success",
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
  console.log(form1.errors);
  return (
    <>
      <StylesProvider injectFirst>
        <div className='myProfilePageContainer'>
          <PostCard sx={{ minWidth: 500, width: 850 }} style={{ height: 560 }}>
            <CardContent>
              <Title>個人資訊</Title>
              <FormContainer>
                <ProfileForm>
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className='inputItem'>
                    <label>使用者名稱 </label>
                    <input
                      {...form1.register("username", { required: "Username is required" })}
                      defaultValue={username}
                      className="detailInput"
                    />
                  </div>
                  {/* errors will return when field validation fails  */}
                  {form1.errors ? <p className='error'>{form1.errors.username.message}</p> : null}
                  <div className='inputItem'>
                    <div className="subInputItem">
                      <label>使用者帳號 </label>
                      <input
                        {...form1.register("userAccount", { required: "User  is required" })}
                        defaultValue={account}
                        className="detailInput" />
                    </div>
                  </div>
                  {/* errors will return when field validation fails  */}
                  {form1.errors ? <p className='error'>{form1.errors.userAccount.message}</p> : null}
                  {/*
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
                  }*/}
                </ProfileForm>
                {/*<div className='profileSubmit'>
                  <input type="submit" />
                </div> */}
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
                  onClick={(e) => form1.handleSubmit(onSubmit1, onError)(e)}
                >
                  Save
                </SendButton>
              </FormContainer>
              <PasswordForm>
                <SecretTitle>修改密碼</SecretTitle>
                <div className='inputItem'>
                  <label>原始密碼 </label>
                  <input {...form2.register("password",
                    { required: "Password is required" })}
                    type="password"
                    className="detailInput"
                  />
                  {/*<ValidateButton onClick={handleValidatePassword}>確認</ValidateButton>*/}
                </div>
                {form2.errors ? <p className='error'>{form2.errors.password.message}</p> : null}
                <div className='inputItem'>
                  <label>新密碼 </label>
                  <input {...form2.register("newPassword",
                    { required: "New password is required" })}
                    type="password"
                    className="detailInput"
                  />
                  {/*<ValidateButton onClick={handleValidatePassword}>確認</ValidateButton>*/}
                </div>
                {form2.errors ? <p className='error'>{form2.errors.password.message}</p> : null}
              </PasswordForm>
              <SendButton2
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
                  onClick={(e) => form2.handleSubmit(onSubmit2, onError)(e)}
                >
                  確認
                </SendButton2>
            </CardContent>
          </PostCard>
        </div>
      </ StylesProvider>
    </>
  )
}

export default MyProfilePage;