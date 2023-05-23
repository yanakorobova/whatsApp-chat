import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginDataType} from "common/type/type";
import {setAppStatus} from "app/app-slice";
import {greenApi} from "common/api/api";
import {handleServerNetworkError} from "common/utils/error-utils";


const initialState = {
    isLoggedIn: false,
    authorized: '',
    userInfo: {
        idInstance: '',
        apiTokenInstance: ''
    }
}

export const login = createAsyncThunk('auth/login',
    async (data: LoginDataType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const request = await greenApi.login(data)
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setDataUser(data))
            const res = await request.json()
            return res.stateInstance
        } catch (error) {
            //@ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
        }
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        setDataUser: (state, action: PayloadAction<LoginDataType>) => {
            state.userInfo.apiTokenInstance = action.payload.apiTokenInstance
            state.userInfo.idInstance = action.payload.idInstance
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.authorized = action.payload
            state.isLoggedIn = true
        })
    }
})

export const authReducer = authSlice.reducer
export const {setDataUser, logOut} = authSlice.actions