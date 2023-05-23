import React, {ReactNode, useState} from 'react';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import s from './BasicModal.module.scss';


type BasicModalPropsType = {
    modalTitle: string
    children: ReactNode
    onClick: () => void
    buttonTitle: string
    disabled: boolean
    onClickClose: () => void
}
export const BasicModal: React.FC<BasicModalPropsType> =
    ({
         modalTitle,
         children,
         onClick,
         buttonTitle,
         disabled,
         onClickClose,
     }) => {

        const [open, setOpen] = useState(false)
        const openHandler = () => setOpen(true)
        const closeHandler = () => {
            setOpen(false)
            onClickClose()
        }
        const saveHandler = () => {
            onClick()
            onClickClose()
            setOpen(false)
        }
        return (
            <>
                <Button type={'button'}
                        variant={'outlined'}
                        onClick={openHandler}
                        fullWidth
                >
                    {buttonTitle}
                </Button>
                <Modal open={open} onClose={closeHandler}>
                    <Box className={s.container}>
                        <div className={s.header}>
                            <Typography variant="h6" component="h2">
                                {modalTitle}
                            </Typography>
                            <IconButton onClick={closeHandler}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        {children}
                        <div className={s.button}>
                            <Button onClick={saveHandler} variant={'contained'} sx={{
                                bgcolor: '#00a884',
                                ':hover': {
                                    bgcolor: '#046e57',
                                },
                            }} disabled={disabled}>
                                Сохранить
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </>
        );
    };

