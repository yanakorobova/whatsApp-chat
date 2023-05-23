import React, {useEffect, useRef} from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Panel} from "features/Chats/Panel/Panel";
import {Chat} from "features/Chats/Chat/Chat";
import {getNotification, getSettings} from "features/Chats/chat-slice";
import {useAppDispatch, useAppSelector} from "app/store";
import {selectIsLoggedIn} from "app/selectors";
import {Navigate} from "react-router-dom";

export const Chats = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const stop = useRef(false)
    useEffect(() => {
        dispatch(getSettings())
        document.body.style.backgroundColor = 'rgb(0,168,132)'
    }, [])

    const rec = async (f: any) => {
        await dispatch(f())
        if(stop.current) return
        else rec(f)
    }

    useEffect(() => {
        rec(getNotification)
        return () => {
            stop.current = true
        }
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <>
            <Box sx={{p: '20px', height: '100vh'}}>
                <Paper sx={{height: '100%', borderRadius: 0}}>
                    <Grid container height={'100%'}>
                        <Panel/>
                        <Chat/>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

