import {AnyAction, combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "features/Auth/auth-slice";
import {appReducer} from "app/app-slice";
import {chatReducer} from "features/Chats/chat-slice";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'

const persistConfigAuth = {
    key: 'auth',
    storage,
    whitelist: ['userInfo', 'isLoggedIn','authorized']
}
const persistConfigChat = {
    key: 'chat',
    storage,
    whitelist: ['chatList']
}
const rootReducer = combineReducers({
    auth: persistReducer(persistConfigAuth, authReducer),
    app: appReducer,
    chat: persistReducer(persistConfigChat, chatReducer)
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, PERSIST, PURGE, REHYDRATE, PAUSE, REGISTER],
            ignoreActions: false,
        },
    }).prepend(thunk)
})
export const persistor = persistStore(store)

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store