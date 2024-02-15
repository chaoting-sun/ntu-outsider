import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styled from "styled-components"
import { ListItemButton } from '@mui/material';



export default function AlignItemsList({chats, OpenChatBox, me}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chats.map( (e) => {
            let name = "";
            for(let i = 0; i < 2; i += 1) {
                if(e.namesOfTalkers[i] !== me)
                    name = e.namesOfTalkers[i]
            }
            if(name === "")
                name = me;
            return(
                <>
                    <ListItemButton onClick={() => OpenChatBox(e)}>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary= {name}/>  
                        </ListItem>
                    </ListItemButton>
                    <Divider/>
                </>
            )
            
        })}
    </List>

  );
}