import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatListType, DataMessageType} from "common/type/type";
import {setAppStatus} from "app/app-slice";
import {greenApi} from "common/api/api";
import {handleServerNetworkError} from "common/utils/error-utils";
import {RootState} from "app/store";
import {logOut} from "features/Auth/auth-slice";

type initialStateType = {
    phoneNumber: string
    activeChat: string
    chatList: ChatListType[]
}
const initialState: initialStateType = {
    phoneNumber: '',
    activeChat: '',
    chatList: []
}

export const getSettings = createAsyncThunk('chat/getSettings',
    async (_, {dispatch, rejectWithValue, getState}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const appState = getState() as RootState
        const userInfo = appState.auth.userInfo
        try {
            const request = await greenApi.getSettings(userInfo)
            dispatch(setAppStatus({status: 'succeeded'}))
            const res = await request.json()
            return res.wid
        } catch (error) {
            //@ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
        }
    })

export const sendMessage = createAsyncThunk('chat/sendMessage',
    async (data: DataMessageType, {dispatch, rejectWithValue, getState}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const appState = getState() as RootState
        const userInfo = appState.auth.userInfo
        try {
            await greenApi.sendMessage({...userInfo, data})
            dispatch(setAppStatus({status: 'succeeded'}))
            return data.message
        } catch (error) {
            //@ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
        }
    })

export const getNotification = createAsyncThunk('chat/getNotification',
    async (_, {dispatch, rejectWithValue, getState}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const appState = getState() as RootState
        const data = appState.auth.userInfo
        try {
            const request = await greenApi.getNotification(data)
            dispatch(setAppStatus({status: 'succeeded'}))
            const res = await request.json()
            if (res) {
                await greenApi.deleteNotification({...data, receiptId: res.receiptId})
                return res.body
            }
            return {}
        } catch (error) {
            //@ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
        }
    })

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createChat: (state, action) => {
            state.chatList.push({phone: action.payload, messageData: []})
        },
        removeChat: (state, action: PayloadAction<{ phone: string }>) => {
            state.chatList = state.chatList.filter(c => c.phone !== action.payload.phone)
            if (action.payload.phone === state.activeChat) {
                state.activeChat = ''
            }
        },
        setActiveChat: (state, action: PayloadAction<{ activeChat: string }>) => {
            state.activeChat = action.payload.activeChat
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
            state.chatList = initialState.chatList
        })
        builder.addCase(getSettings.fulfilled, (state, action) => {
            state.phoneNumber = action.payload.replace(/\D/g, '')
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.chatList.find(item => item.phone === state.activeChat)?.messageData.push({
                sender: 'me',
                message: action.payload,
                timestamp: new Date().toLocaleTimeString('ru-Ru', {
                    hour: '2-digit', minute: '2-digit'
                })
            })
        })
        builder.addCase(getNotification.fulfilled, (state, action) => {
            const {messageData} = action.payload
            if (messageData && messageData.typeMessage === "textMessage") {
                const phoneSender = action.payload.senderData.chatId.replace(/\D/g, '')
                state.chatList.find(
                    item => item.phone === phoneSender
                )?.messageData.push({
                    sender: state.phoneNumber === phoneSender ? 'me' : 'other',
                    message: action.payload?.messageData.textMessageData.textMessage,
                    timestamp: new Date().toLocaleTimeString('ru-Ru', {
                        hour: '2-digit', minute: '2-digit'
                    })
                })
            }
        })
    }

})

export const chatReducer = chatSlice.reducer
export const {createChat, removeChat, setActiveChat} = chatSlice.actions