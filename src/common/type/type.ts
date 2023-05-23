export type LoginDataType = {
    idInstance: string
    apiTokenInstance: string
}
export type ChatListType = {
    phone: string
    messageData: MessageType[]
}
type MessageType = {
    sender: 'me' | 'other'
    message: string
    timestamp: any
}
export type DataMessageType = {
    chatId: string
    message: string
}
export type SendMessageDataType = LoginDataType & {
    data: DataMessageType
}
export  type NotificationDataType = LoginDataType & {
    receiptId: number
}