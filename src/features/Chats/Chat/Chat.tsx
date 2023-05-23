import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Grid from "@mui/material/Grid";
import s from './Chat.module.scss';
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "app/store";
import {selectActiveChat, selectChat} from "app/selectors";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";
import {sendMessage, setActiveChat} from "features/Chats/chat-slice";
import {IconButton} from "@mui/material";
import img from 'assets/img/back.png'

export const Chat = () => {
    const [value, setValue] = useState('')
    const activeChat = useAppSelector(selectActiveChat)
    const chat = useAppSelector(selectChat)
    const dispatch = useAppDispatch()
    const messages = chat.length ? chat[0].messageData : []

    const closeChatHandler = () => {
        dispatch(setActiveChat({activeChat: ''}))
    }
    const sendMessageHandler = () => {
        if (value.trim() !== '') {
            dispatch(sendMessage({message: value, chatId: activeChat + '@c.us'}))
        }
        setValue('')
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && sendMessageHandler()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const image = {
        backgroundImage: `url(${img})`
    }
    return (
        <Grid item flex={'0 0 70%'} sx={{background: '#f0f2f5'}}>
            {activeChat ? <div className={s.containerChat}>
                <div className={s.header}>
                    <Typography component="div">
                        {'+' + activeChat}
                    </Typography>
                    <CloseIcon onClick={closeChatHandler} style={{cursor: 'pointer'}}/>
                </div>
                <div className={s.chat} style={image}>
                    {messages.length > 0 ? (
                        <div className={s.wrapper}>
                            <div className={s.containerMessages}>
                                {messages.map((item, i) => {
                                    return <div className={s.message + (item.sender === 'me' ? ' ' + s.me : ' ' + s.other)}
                                                key={i}>
                                        <div className={s.text}>{item.message}</div>
                                        <div className={s.date}>{item.timestamp}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className={s.inputPanel}>
                    <input className={s.input}
                           value={value}
                           placeholder={'Введите сообщение'}
                           onKeyDown={onEnter}
                           onChange={onChangeHandler}
                    />
                    <IconButton onClick={sendMessageHandler}>
                        <SendIcon/>
                    </IconButton>
                </div>
            </div> : <></>}
        </Grid>);
};

