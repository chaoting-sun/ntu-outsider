import React from 'react'
import '../css/mailPage.css'
import styled from "styled-components"
import Message from '../components/Message'
import {useState, useEffect, useRef} from 'react'
//import ChatList from '../components/chatList' 
import { Typography, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {CHATBOXES_QUERY, CHATBOX_SUBSCRIPTION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION, CREATE_CHATBOX_MUTATION} from './graphql/index';
import { useQuery, useMutation} from '@apollo/react-hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useOusider } from './hooks/useOusider'

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
//const message = [{me:false, msg: "hollow"}, {me:true, msg: "heyyyyyyyyyheyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"},
//{me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, ]
//const users = ["Amy", "Ric", "Bob", "mom", "dad", "Amy", "Ric", "Bob", "mom", "dad"]
//test end

//Test subscription
//take me from useOutsider

//test end

const MailPage =  () => {
    /*const me = {
        _id: "63b54740fb8d79ecc3f215f9",
        name: "AAAA"
    }*/
    const [messages, setMessages] = useState([]);
    const [chatBoxes, setChatBoxes] = useState([]);
    const [myMsg, setMyMsg] = useState("");
    const [friendId, setFriendId] = useState("");
    const [friendName, setFriendName] = useState("");
    const {userId, userName} = useOusider();
    const msgFooter = useRef();
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
    const OpenChatBox = (box) => {
        //console.log("open");
        //console.log(box);
        let name = "";
            for(let i = 0; i < 2; i += 1) {
                if(box.namesOfTalkers[i] !== userName)
                    name = box.namesOfTalkers[i]
            }
            if(name === "")
                name = userName;
        setFriendName(name);
        let ids = box.name.split("_");
        for (let i = 0; i < 2; i += 1) {
            if(ids[i] !== userId)
                setFriendId(ids[i]);
        }
        setMessages(box.messages);
    }

    const HandleSend = async() => {
        //console.log(me._id, friendId, myMsg);
        let a = await sendMessage({variables: {
            name: userId,
            to: friendId,
            message: myMsg
        }})
        setMyMsg("");
    }



    const { loading, error, data: boxesData, subscribeToMore} = useQuery(CHATBOXES_QUERY, {
        variables: {userId}, 
     });
    //console.log(error);

    useEffect(() => {
        scrollToBottom();
    }, messages)

    useEffect(() => { 
        subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { id: userId },
            updateQuery: (prev, { subscriptionData }) => {
            console.log(subscriptionData);
            if (!subscriptionData.data) return prev;
            //console.log(subscriptionData.data.subscribeChatBox);
            const newMessage = subscriptionData.data.subscribeMessage.message;
            const boxToPut = subscriptionData.data.subscribeMessage.chatBoxName;
            console.log(prev.queryChatBoxes)
            return {
                queryChatBoxes: 
                    prev.queryChatBoxes.map(box => {
                        if(box.name === boxToPut) {
                            const newBox = { ...box, messages: [newMessage, ...box.messages] };
                            setMessages([newMessage, ...box.messages])
                            console.log(newBox);
                            return(newBox);
                        }
                        else {
                            return box;
                        }
                    })
            };
            },
        });
    }, [subscribeToMore]); 

    useEffect(() => {
        //console.log("subscribe");
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: { id: userId },
            updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            //console.log(subscriptionData.data.subscribeChatBox);
            const newBox = subscriptionData.data.subscribeChatBox;
            
            //console.log({ ...prev.queryChatBoxes})
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
    
    console.log(messages);
    return (
        <div className='mailPageContainer'>
            <div className='chatbar'>
                <div className='titleContainer'>
                    <p className="messageTitle">Message</p>
                </div>
                <Divider />
                <div className='scrollbar'>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {chatBoxes.map( (e) => {
                            let name = "";
                            for(let i = 0; i < 2; i += 1) {
                                if(e.namesOfTalkers[i] !== userName)
                                    name = e.namesOfTalkers[i]
                            }
                            if(name === "")
                                name = userName;
                            return(
                                <>
                                    <ListItemButton>
                                        <ListItem alignItems="flex-start" onClick={() => OpenChatBox(e)}>
                                            <ListItemText primary= {name}/>  
                                        </ListItem>
                                    </ListItemButton>
                                    <Divider/>
                                </>
                            )
                            
                        })}
                    </List> 
                </div>
            </div>
            <div className='chatBox'>
                <div className='titleContainer'>
                    <p className="messageTitle">{friendName ? friendName: null}</p>
                </div>
                <Divider />
                <ChatBoxWrapper>
                    {
                        messages.map(({sender, body}, i) => (
                            <Message isMe = {userId === sender} message = {body} key = {i} />
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