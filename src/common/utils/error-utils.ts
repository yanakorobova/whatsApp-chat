import {Dispatch} from 'redux'
import {setAppError, setAppStatus} from "app/app-slice";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppError({error: error.message ? error.message: 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}

