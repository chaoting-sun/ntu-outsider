import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
// import { InputLabel, InputField, SubmitButton } from './common/Form';
import { useOutsider } from './hooks/useOutsider';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Input } from 'antd';

import PathConstants from '../routes/pathConstants';
import { USER_QUERY, UPDATE_USER_MUTATION, UPDATE_PASSWORD_MUTATION } from './graphql/index';
import { hashPassword } from '../utils/hash';
import '../css/myProfilePage.css';


const { TextArea } = Input;

const PostCard = styled(Card)`
  width: 80% !important;
  top: -15vh;
`

const Title = styled.div`{
    color: #20B2AA !important;
    margin-top:3vh !important;
    margin-left:5vh !important;
    margin-bottom: 3vh;
    font-size: 30px !important;
    display: flex !important;
    font-weight: 500;
  }
`

const ValidateButton = styled(Button)`{
    color: #20B2AA !important;
    font-size: 14px !important;
    display: flex !important;
    margin-right: 0px !important;
    padding: 0px !important;
    width: 5px !important;
  }
`

const SendButton = styled(Button)`{
    margin-top:20px !important;
    font-size: 15px !important;
    display: flex !important;
    justify-content: center !important;
    padding: 5px !important; 
    /*bottom: 5vh !important;*/
    left: 50% !important;
    width: 25% !important;
    // min-width: 20px !important;
    height: 40px !important;
    position:relative;
    border-radius: 15px !important;
  }
`

const SendButton2 = styled(Button)`{
    margin-top:20px !important;
    font-size: 15px !important;
    display: flex !important;
    justify-content: center !important;
    padding: 5px !important; 
    /*bottom: 5vh !important;*/
    left: 35% !important;
    width: 20% !important;
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
    setAccount, displayStatus, authenticated } = useOutsider();
  const [queryUser] = useLazyQuery(USER_QUERY, { fetchPolicy: 'network-only' });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);
  const navigate = useNavigate();

  const form1 = useForm()
  const form2 = useForm()

  console.log("I am myprofilepage!")

  useEffect(() => {
    if (!authenticated) navigate(PathConstants.LOGIN);
  }, [authenticated])

  //更改name, account
  const onSubmit1 = async (data) => {
    const user = await updateUser({
      variables: {
        userId,
        name: data.username,
        account: data.userAccount
      }
    });

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

  const onSubmit2 = async (input) => {
    const { data: userData } = await queryUser({
      variables: {
        account: account,
        password: input.password
      }
    })

    if (!userData.queryUser) {
      // wrong password
      displayStatus({
        "type": "fail",
        "msg": "Wrong password!"
      })
    } else {
      // correct password
      const { data } = await updatePassword({
        variables: {
          userId: userId,
          oldPassword: userData.queryUser.password,
          newPassword: hashPassword(input.newPassword),
        }
      })
      if (data.updatePassword) {
        displayStatus({
          "type": "success",
          "msg": "successfully update password!"
        })
      } else {
        displayStatus({
          "type": "fail",
          "msg": "fail to update password!"
        })
      }
    }
  }

  return (
    <>
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

              </ProfileForm>
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
                更新資料
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
              更換密碼
            </SendButton2>

          </CardContent>
        </PostCard>
      </div>
    </>
  )
}

export default MyProfilePage;