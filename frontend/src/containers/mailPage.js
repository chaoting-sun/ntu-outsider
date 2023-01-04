import React from 'react'
import '../css/mailPage.css'
import styled from "styled-components"
import Message from '../components/Message'
import {useState, useEffect, useRef} from 'react'
import ChatList from '../components/chatList' 
import { Typography, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {CHATBOXES_QUERY, CHATBOX_SUBSCRIPTION} from './graphql/index';
import { useQuery} from '@apollo/react-hooks';

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

//Test subscription
//take me from useOutsider
const me = {
    _id: "63b3e2ce1478daad8f55bcdd",
}
//test end

const MailPage =  () => {
    const [messages, setMessages] = useState([]);
    const [chatBoxes, setChatBoxes] = useState([]);
    const [myMsg, setMyMsg] = useState("");
    const msgFooter = useRef();
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }

    const OpenChatBox = (box) => {
        console.log("open");
        console.log(box);
        setMessages(box.messages);
    }

    const HandleSend = () => {
        setMyMsg("");
    }

    const { loading, error, data: boxesData, subscribeToMore} = useQuery(CHATBOXES_QUERY, {
        variables: {userId: me._id}, 
     });
    //console.log(error);

    useEffect(() => {
        
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: { id: me._id },
            updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            console.log(subscriptionData.data.subscribeChatBox);
            const newBox = subscriptionData.data.subscribeChatBox;
            
            console.log({ ...prev.queryChatBoxes})
            return {
                queryChatBoxes: [
                    ...prev.queryChatBoxes, newBox
                ]  
            };
            },
        });
    }, [subscribeToMore]);
    useEffect(() => {
        if(boxesData !== undefined)
            setChatBoxes(boxesData.queryChatBoxes)
    }, [boxesData])
    console.log(chatBoxes);
    console.log(boxesData);
    //console.log(messages);
    return (
        <div className='mailPageContainer'>
            <div className='chatbar'>
                <div className='titleContainer'>
                    <p className="messageTitle">Message</p>
                </div>
                <Divider />
                <div className='scrollbar'>
                    <ChatList chats = {chatBoxes} OpenChatBox = {OpenChatBox}/> 
                </div>
            </div>
            <div className='chatBox'>
                <div className='titleContainer'>
                    <p className="messageTitle">Name</p>
                </div>
                <Divider />
                <ChatBoxWrapper>
                    {
                        messages.map(({sender, body}, i) => (
                            <Message isMe = {me._id === sender} message = {body} key = {i} />
                        ))
                    }
                    <Footer ref = {msgFooter}></Footer>
                </ChatBoxWrapper>
                <div className='sendContainer'>
                    <input className='messageInput' value={myMsg} onChange = {(e) => {setMyMsg(e.target.value)}}/>
                    <SendButton>
                        <SendIcon onClick = {HandleSend}/>        
                    </SendButton>
                </div>
            </div>
        </div>
    )
}

export default MailPage;