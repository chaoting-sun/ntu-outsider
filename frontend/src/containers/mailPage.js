import React from 'react'
import '../css/mailPage.css'
import styled from "styled-components"
import Message from '../components/Message'
import {useState, useEffect, useRef} from 'react'
import ChatList from '../components/chatList' 
import { Typography, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBoxWrapper = styled.div`
    min-height: 80%;
    height: 80%;
    width:100%;
    display:flex;
    flex-direction: column;  
    overflow:auto;
    background: #F0F1F5;
    padding: 5px 10px;
`
const Footer = styled.div`
    height: 20px;    
`;

const SendButton = styled(IconButton)`
   width: 50px !important; 
`

//For test
const message = [{me:false, msg: "hollow"}, {me:true, msg: "heyyyyyyyyyheyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"},
{me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, ]
const users = ["Amy", "Ric", "Bob", "mom", "dad", "Amy", "Ric", "Bob", "mom", "dad"]
//test end

const MailPage =  () => {
    const msgFooter = useRef();
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }

    return (
        <div className='mailPageContainer'>
            <div className='chatbar'>
                <div className='titleContainer'>
                    <p className="messageTitle">Message</p>
                </div>
                <Divider />
                <div className='scrollbar'>
                    <ChatList chats = {users}/> 
                </div>
            </div>
            <div className='chatBox'>
                <div className='titleContainer'>
                    <p className="messageTitle">Name</p>
                </div>
                <Divider />
                <ChatBoxWrapper>
                    {
                        message.map(({me, msg}, i) => (
                            <Message isMe = {me} message = {msg} key = {i} />
                        ))
                    }
                    <Footer ref = {msgFooter}></Footer>
                </ChatBoxWrapper>
                <div className='sendContainer'>
                    <input className='messageInput'/>
                    <SendButton>
                        <SendIcon />        
                    </SendButton>
                </div>
            </div>
        </div>
    )
}

export default MailPage;