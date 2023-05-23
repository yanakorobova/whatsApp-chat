import React from 'react';
import {Header} from "common/components/Header/Header";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Form} from "features/Auth/Form/Form";
import {useAppSelector} from "app/store";
import {selectAuthorized, selectError} from "app/selectors";
import {Navigate} from "react-router-dom";

export const Auth = () => {
    const authorized = useAppSelector(selectAuthorized)
    const error = useAppSelector(selectError)

    document.body.style.backgroundColor = 'hsl(0, 0%, 95%)'

    if (authorized === 'authorized') {
        return <Navigate to={'/chats'}/>
    }
    console.log((authorized && authorized !== 'authorized' ? 'Что-то пошло не так... Проверьте свой аккаунт'
        : error? error : ''))
    const errorMessage =  (authorized && authorized !== 'authorized' ? 'Что-то пошло не так... Проверьте свой аккаунт'
        : error? 'Неверный idInstance или apiTokenInstance' : '')

    return (
        <>
            <Header/>
            <Grid container justifyContent={'center'} alignItems={'center'} marginTop={'40px'}>
                <Paper sx={{padding: '40px 33px', width: 400}}>
                    <Form/>
                    <div style={{color: 'red', marginTop:'20px'}}>{errorMessage}</div>
                </Paper>
            </Grid>
        </>
    );
};

