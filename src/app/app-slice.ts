import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
}

const appSlice = createSlice(({
        name: "app",
        initialState,
        reducers: {
            setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
                state.status = action.payload.status
            },
            setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
                state.error = action.payload.error
            }
        }
    }
))

export const appReducer = appSlice.reducer
export const {setAppStatus, setAppError} = appSlice.actions



