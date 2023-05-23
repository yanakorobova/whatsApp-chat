import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const Header = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" style={{ background: '#00a884' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ m: '0 auto' }}>
                        WhatsApp Chat
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

