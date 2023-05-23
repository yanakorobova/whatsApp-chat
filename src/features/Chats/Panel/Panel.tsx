import React, {MouseEvent} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "app/store";
import {selectChatList, selectPhoneNumber} from "app/selectors";
import LogoutIcon from '@mui/icons-material/Logout';
import {logOut} from "features/Auth/auth-slice";
import {InputModal} from "features/Chats/Panel/InputModal/InputModal";
import RemoveIcon from '@mui/icons-material/Remove';
import {removeChat, setActiveChat} from "features/Chats/chat-slice";
import s from './Panel.module.scss';

export const Panel = () => {
    const phoneNumber = useAppSelector(selectPhoneNumber)
    const chatList = useAppSelector(selectChatList)
    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logOut())
    }
    const openChatHandler = (phone: string) => {
        dispatch(setActiveChat({activeChat: phone}))
    }
    const removeChatHandler = (e: MouseEvent<SVGSVGElement>, phone: string) => {
        e.stopPropagation()
        dispatch(removeChat({phone}))
    }
    return (
        <Grid item className={s.panel}>
            <Grid item container direction="column">
                <Box className={s.header}>
                    <div>{'+' + phoneNumber}</div>
                    <LogoutIcon style={{cursor: 'pointer'}} onClick={logOutHandler}/>
                </Box>
                <Box className={s.button}>
                    <InputModal/>
                </Box>
                <div className={s.chats}>
                    <List sx={{p: 0}} className={s.list}>
                        {chatList?.map(c => {
                            return <ListItem key={c.phone} className={s.chatItem} onClick={() => openChatHandler(c.phone)}>
                                <ListItemText
                                    primary={
                                        <div className={s.text}>
                                            <div>{'+' + c.phone}</div>
                                            <RemoveIcon
                                                onClick={(e) => removeChatHandler(e, c.phone)}
                                            />
                                        </div>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{display: 'inline'}}
                                            component="span"
                                            variant="body2"
                                            color="rgb(102, 119, 129)"
                                        >
                                            {//@ts-ignore
                                                c.messageData.length ? c.messageData.at(-1).message.substring(0,15) : ''
                                            }
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        })}
                    </List>
                </div>

            </Grid>
        </Grid>
    );
};

