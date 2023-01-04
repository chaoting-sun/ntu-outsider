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



export default function AlignItemsList({chats, OpenChatBox}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chats.map( (e) => {
            //console.log(i);
            return(
                <>
                    <ListItemButton onClick={() => OpenChatBox(e)}>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary= {e.name}/>
                        </ListItem>
                    </ListItemButton>
                    <Divider/>
                </>
            )
            
        })}
    </List>
    
  );
}