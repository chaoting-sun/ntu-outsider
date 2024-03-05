/* deprecated */

// import React from 'react'
// import '../css/viewPostPage.css'
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Buttonm from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import styled from 'styled-components';
// import { useForm } from "react-hook-form";
// import TextField from '@mui/material/TextField';
// import { Input } from 'antd';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import Divider from '@mui/material/Divider';
// import { Button, Modal, Space, Tag } from 'antd';
// import { ExclamationCircleFilled } from '@ant-design/icons';
// import { useOutsider } from './hooks/useOutsider';
// import { CREATE_CHATBOX_MUTATION } from './graphql';
// import { useQuery, useMutation} from '@apollo/react-hooks';

// const { confirm } = Modal;
// const { TextArea } = Input;


// const PostCard = styled(Card)`
//   position: relative;
//   top: -15vh;
//   border-radius: 10px !important;
// `

// const Content = styled(TextArea)`
//   margin-top: 5vh; 
//   width: 100%;
//   font-size: 18px;
//   padding: 1vh 2vh; 
// `

// const InformationItem = styled(Typography)`
//   display: flex !important;
//   justify-content: start;
//   left: 5px;
//   position:relative;
// `

// const InformationBox = styled(Grid)`
//   position: relative;
//   left: 30px;
// `

// const NameButton = styled(Buttonm)`
//   color: #20B2AA !important;
//   margin-top:1vh !important;
//   font-size: 22px !important;
//   display: flex !important;
//   left: 3vh !important;
// `

// //從"/viewPostPage"傳入的state = {
// // class
// // classNo
// // endDate
// // endTime
// // remainder
// // teacher
// // title
// // }
// // e.g. defaultValue={state ? state.title: null}

// //for test
// const tags = ["網服", "Ric"]


// const ViewPostPage = () => {
//   const navigate = useNavigate();
//   const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm();
//   const {userId} = useOutsider();
//   /*const onSubmit = (data) => {
//     console.log(data);
//     navigate("/viewPostPage"); //use mutation; 傳入該篇文章資料

//   };*/ // your form submit function which will invoke after successful validation

//   //console.log(watch("example")); // you can watch individual input by pass the name of the input

//   const ShowDeletePostModal = () => {
//     confirm({
//       title: 'Do you Want to delete the post?',
//       icon: <ExclamationCircleFilled />,
//       content: '',
//       onOk() {
//         console.log('OK');
//         //navigate到前一個頁面
//       },
//       onCancel() {
//         console.log('Cancel');
//       },
//     });
//   };

//   const EditPost = () => {
//     navigate("/addPostPage");
//   }

  

//   return (
//       <div className='editPostPageContainer'>
//           <PostCard sx={{ minWidth: 400 }}>
//             <CardContent>
//                 <Typography sx={{ fontSize: 28, display: "flex", position: "relative", left: 30, marginTop: 5}} gutterBottom>
//                   Title
//                 </Typography>
//                 <div className='editBox'>
//                   <IconButton aria-label="delete" onClick = {ShowDeletePostModal}>
//                     <DeleteIcon />
//                   </IconButton>
//                   <IconButton aria-label="delete" onClick = {EditPost}>
//                     <EditIcon />
//                   </IconButton>
//                 </div>
//                 <Divider />
//                 <NameButton>Name</NameButton>
//                 <InformationBox item xs container direction="column" spacing={1}>
//                     <Grid item xs>
//                       {/* <TitleItem gutterBottom variant="subtitle1" component="div" >
//                         標題
//                       </TitleItem> */}
//                       <InformationItem variant="subtitle1">
//                         課名
//                       </InformationItem>
//                       <InformationItem variant="body2" color="text.secondary">
//                         授課老師： 
//                       </InformationItem>
//                       <InformationItem variant="body2" color="text.secondary">
//                         流水號：
//                       </InformationItem>
//                       <InformationItem variant="body2" color="text.secondary"> 
//                         截止時間： 
//                       </InformationItem>
//                       <InformationItem variant="body2" color="text.secondary"> 
//                         剩餘徵求名額： 
//                       </InformationItem>
//                       <div className='tags'>
//                         {tags.map( e => (
//                           <Tag color="processing"> {e} </Tag>
//                         ))}
                        
//                       </div>
//                       </Grid>
//                       <Grid item>
//                       <Typography paragraph className='content' align = "left">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                       </Typography>
//                     </Grid>
//                 </InformationBox>
//               </CardContent>
//           </PostCard>
//       </div>
//   )
// }
// export default ViewPostPage






