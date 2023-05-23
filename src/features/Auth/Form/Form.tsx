import React from 'react';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch} from "app/store";
import {useFormik} from "formik";
import {login} from "features/Auth/auth-slice";

export const Form = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            idInstance: '',
            apiTokenInstance: '',
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },

    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{width: '100%'}}>
                <FormLabel>
                    <Typography
                        component={'h1'}
                        style={{
                            marginBottom: 30,
                            textAlign: 'center',
                            fontSize: '26px',
                            fontWeight: 700
                        }}
                    >
                        Авторизация
                    </Typography>
                </FormLabel>
                <FormGroup>
                    <TextField label="idInstance" margin="normal" required
                               {...formik.getFieldProps('idInstance')}/>
                    <TextField label="apiTokenInstance" margin="normal" required
                               {...formik.getFieldProps('apiTokenInstance')} type={'password'}/>
                    {}
                    <Button sx={{
                        mt: '30px', bgcolor: '#00a884',
                        ':hover': {
                            bgcolor: '#046e57',
                        },
                    }}
                            type={'submit'}
                            variant={'contained'}
                    >
                        Войти
                    </Button>
                </FormGroup>
            </FormControl>
        </form>
    );
};
