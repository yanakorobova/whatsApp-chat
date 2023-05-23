import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "common/components/Modal/BasicModal";
import FormControl from '@mui/material/FormControl'
import TextField from "@mui/material/TextField";
import {useAppDispatch} from "app/store";
import {createChat} from "features/Chats/chat-slice";

export const InputModal = () => {
    const [error, setError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(createChat(value))
    }
    const onClickCloseHandler = () => {
        setValue('')
        setError(false)
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (/\D/g.test(e.currentTarget.value)) setError(true)
        else setError(false)
        setValue(e.currentTarget.value)
    }
    const disabled = error || !value || value.length > 18
    return (
        <BasicModal
            modalTitle={'Создать новый чат'}
            buttonTitle={'Новый чат'}
            onClick={onClickHandler}
            disabled={disabled}
            onClickClose={onClickCloseHandler}
        >
            <FormControl fullWidth variant="standard">
                <TextField
                    fullWidth
                    label={'Номер телефона'}
                    variant="standard"
                    helperText={error && 'Некорректный номер'}
                    error={error}
                    value={value}
                    onChange={changeHandler}
                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                />
            </FormControl>
        </BasicModal>
    );
};

