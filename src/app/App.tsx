import React from 'react';
import {AuthorizationPage} from "pages/AuthorizationPage";
import {Route, Routes} from "react-router-dom";
import s from './App.module.scss'
import {MainPage} from "pages/MainPage";

function App() {
    return (
        <div className={s.app}>
            <Routes>
                <Route path={'/'} element={<AuthorizationPage/>}/>
                <Route path={'/chats'} element={<MainPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
