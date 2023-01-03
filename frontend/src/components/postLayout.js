import React from 'react'
import '../css/viewPostPage.css'
import '../css/PostLayout.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Buttonm from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { Input } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Button, Modal, Space, Tag } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ButtonBase from '@material-ui/core/ButtonBase';

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

const PostLayout = ({
  title,
  posterName,
  className,
  teacherName,
  classNo,
  deadline,
  condition,
  content,
  leftMembersRequired,
  tags
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();


  const ShowDeletePostModal = () => {
    confirm({
      title: 'Do you Want to delete the post?',
      icon: <ExclamationCircleFilled />,
      content: '',
      onOk() {
        console.log('OK');
        //navigate到前一個頁面
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const EditPost = () => {
    navigate("/editPostPage");
  }

  const testOnClick = () => {
    console.log();
  }

  return (
    // <div className='editPostPageContainer'>
    <PostCard sx={{ minWidth: 400 }}>
      <ButtonBase
      // className={props.classes.cardAction}
      // onClick={event => { ... }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 28, display: "flex", position: "relative", left: 30, marginTop: 5 }} gutterBottom>
            {title}
          </Typography>
          <div className='editBox'>
            <IconButton aria-label="delete" onClick={ShowDeletePostModal}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={EditPost}>
              <EditIcon />
            </IconButton>
          </div>
          <Divider />
          <NameButton>{posterName}</NameButton>
          <InformationBox item xs container direction="column" spacing={1}>
            <Grid item xs>
              <InformationItem variant="subtitle1">
                {className}
              </InformationItem>
              <InformationItem variant="body2" color="text.secondary">
                授課老師： {teacherName}
              </InformationItem>
              <InformationItem variant="body2" color="text.secondary">
                流水號： {classNo}
              </InformationItem>
              <InformationItem variant="body2" color="text.secondary">
                截止時間： {deadline}
              </InformationItem>
              <InformationItem variant="body2" color="text.secondary">
                剩餘徵求名額： {`${leftMembersRequired} / ${condition}`}
              </InformationItem>
              <div className='tags'>
                {tags.map(e => (
                  <Tag key={e} color="processing"> {e} </Tag>
                ))}

              </div>
            </Grid>
            <Grid item>
              <Typography paragraph className='content' align="left">
                {content}
              </Typography>
            </Grid>
          </InformationBox>
        </CardContent>
      </ButtonBase>
    </PostCard>
    // </div>
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