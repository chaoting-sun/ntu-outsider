import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  CHATBOXES_QUERY,
  CHATBOX_SUBSCRIPTION,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_SUBSCRIPTION,
  CREATE_CHATBOX_MUTATION,
} from "./graphql/index";
import { useQuery, useMutation } from "@apollo/client";

import { Divider, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

import { useOusider } from "./hooks/useOusider";
import Message from "../components/Message";
import "../css/mailPage.css";

const ChatBoxWrapper = styled.div`
  min-height: 80%;
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: #f0f1f5;
  padding: 5px 10px;
`;
const Footer = styled.div`
  height: 20px;
`;

const SendButton = styled(IconButton)`
  width: 50px !important;
`;

//For test
//const message = [{me:false, msg: "hollow"}, {me:true, msg: "heyyyyyyyyyheyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"}, {me:true, msg: "heyyyyyyyyy"},
//{me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, {me:false, msg: "hollow"}, ]
//const users = ["Amy", "Ric", "Bob", "mom", "dad", "Amy", "Ric", "Bob", "mom", "dad"]
//test end

//Test subscription
//take me from useOutsider

//test end

const MailPage = () => {
  const { state } = useLocation();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [myMsg, setMyMsg] = useState("");
  const [friendId, setFriendId] = useState("");
  const [friendName, setFriendName] = useState("");
  const [boxName, setBoxName] = useState("");
  const { userId, username } = useOusider();
  const [openChatBox, setOpenChatBox] = useState(false);
  const msgFooter = useRef();
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);

  const {
    loading,
    error,
    data: boxesData,
    subscribeToMore,
  } = useQuery(CHATBOXES_QUERY, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const OpenChatBox = (box) => {
    //console.log("open");
    //console.log(box);
    setOpenChatBox(true);
    let name = "";
    for (let i = 0; i < 2; i += 1) {
      if (box.namesOfTalkers[i] !== username) name = box.namesOfTalkers[i];
    }
    if (name === "") name = username;
    setFriendName(name);
    let ids = box.name.split("_");
    for (let i = 0; i < 2; i += 1) {
      if (ids[i] !== userId) setFriendId(ids[i]);
    }
    setMessages(box.messages);
    setBoxName(box.name);
  };

  useEffect(() => {
    // console.log("loaction");
    if (state) {
      setOpenChatBox(true);
      // console.log(state.Box);
      OpenChatBox(state.Box);
      // console.log(state.PosterId);
    }
  }, [location]);

  const HandleSend = async () => {
    //console.log(me._id, friendId, myMsg);
    let a = await sendMessage({
      variables: {
        name: userId,
        to: friendId,
        message: myMsg,
      },
    });
    setMyMsg("");
  };

  const KeySend = async (event) => {
    if (event.key === "Enter") {
      let a = await sendMessage({
        variables: {
          name: userId,
          to: friendId,
          message: myMsg,
        },
      });
      setMyMsg("");
    }
  };

  //console.log(error);

  useEffect(() => {
    scrollToBottom();
  }, messages);

  /*const resetMessages = async() => {
        const box = await createChatBox({variables: {
            name: userId,
            to: friendId
          }})
        //console.log(box.data.createChatBox.messages);
        setMessages(box.data.createChatBox.messages);
    }

    useEffect(() => {
        resetMessages();
        console.log(chatBoxes);
    }, chatBoxes)*/

  // console.log(chatBoxes);

  useEffect(() => {
    //console.log("subscribe")
    let unsubscribe;
    unsubscribe = subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { id: userId },
      updateQuery: (prev, { subscriptionData }) => {
        // console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        // console.log(subscriptionData.data.subscribeChatBox);
        const newMessage = subscriptionData.data.subscribeMessage.message;
        const boxToPut = subscriptionData.data.subscribeMessage.chatBoxName;
        //console.log(prev.queryChatBoxes)
        return {
          queryChatBoxes: prev.queryChatBoxes.map((box) => {
            if (box.name === boxToPut) {
              const newBox = {
                ...box,
                messages: [...box.messages, newMessage],
              };
              if (box._id === newBox._id)
                setMessages([...box.messages, newMessage]);
              //console.log(newBox);
              return newBox;
            } else {
              return box;
            }
          }),
        };
      },
    });
    if (unsubscribe) return () => unsubscribe();
  }, [subscribeToMore]);

  useEffect(() => {
    // console.log("subscribe");
    let unsubscribe;
    unsubscribe = subscribeToMore({
      document: CHATBOX_SUBSCRIPTION,
      variables: { id: userId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        //console.log(subscriptionData.data.subscribeChatBox);
        const newBox = subscriptionData.data.subscribeChatBox;
        //console.log(boxesData);
        let add = true;
        prev.queryChatBoxes.forEach((e) => {
          if (e.name === newBox.name) {
            add = false;
          }
        });
        if (add) {
          return {
            queryChatBoxes: [newBox, ...prev.queryChatBoxes],
          };
        } else return prev;
      },
    });
    if (unsubscribe) return () => unsubscribe();
  }, [subscribeToMore]);

  useEffect(() => {
    //console.log(boxesData);
    if (boxesData !== undefined) setChatBoxes(boxesData.queryChatBoxes);
  }, [boxesData]);

  // console.log(boxesData);
  //console.log(boxesData.queryChatBoxes);
  //console.log(chatBoxes);

  //console.log(messages);
  return (
    <div className="mailPageContainer">
      <div className="chatbar">
        <div className="titleContainer">
          <p className="messageTitle">Message</p>
        </div>
        <Divider />
        <div className="scrollbar">
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {chatBoxes.map((e) => {
              let name = "";
              for (let i = 0; i < 2; i += 1) {
                if (e.namesOfTalkers[i] !== username)
                  name = e.namesOfTalkers[i];
              }
              if (name === "") name = username;
              return (
                <>
                  <ListItemButton
                    style={
                      boxName === e.name
                        ? { backgroundColor: "#F0F1F5" }
                        : { backgroundColor: "white" }
                    }
                  >
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => OpenChatBox(e)}
                    >
                      <ListItemText primary={name} />
                    </ListItem>
                  </ListItemButton>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
      </div>
      {openChatBox ? (
        <div className="chatBox">
          <div className="titleContainer">
            <p className="messageTitle">{friendName ? friendName : null}</p>
          </div>
          <Divider />
          <ChatBoxWrapper>
            {messages.map(({ sender, body }, i) => (
              <Message isMe={userId === sender} message={body} key={i} />
            ))}
            <Footer ref={msgFooter}></Footer>
          </ChatBoxWrapper>
          <div className="sendContainer">
            <input
              className="messageInput"
              value={myMsg}
              onChange={(e) => {
                setMyMsg(e.target.value);
              }}
              onKeyDown={KeySend}
            />
            <SendButton>
              <SendIcon onClick={HandleSend} />
            </SendButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MailPage;
