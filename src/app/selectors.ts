import {AppRootStateType} from "app/store";

export const selectAuthorized = (state: AppRootStateType) => state.auth.authorized
export const selectError = (state: AppRootStateType) => state.app.error
export const selectPhoneNumber = (state: AppRootStateType) => state.chat.phoneNumber
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectChatList = (state: AppRootStateType) => state.chat.chatList
export const selectActiveChat = (state: AppRootStateType) => state.chat.activeChat
export const selectChat = (state: AppRootStateType) => state.chat.chatList.filter(c => c.phone === state.chat.activeChat)
