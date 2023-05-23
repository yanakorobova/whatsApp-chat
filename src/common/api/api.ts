import {LoginDataType, NotificationDataType, SendMessageDataType} from "common/type/type";

const BASE_URL = 'https://api.green-api.com/waInstance'
export const greenApi = {
    login(data: LoginDataType) {
        const {idInstance, apiTokenInstance} = data
        return fetch(`${BASE_URL}${idInstance}/getStateInstance/${apiTokenInstance}`);
    },
    getSettings(data: LoginDataType) {
        const {idInstance, apiTokenInstance} = data
        return fetch(`${BASE_URL}${idInstance}/getSettings/${apiTokenInstance}`);
    },
    sendMessage(data: SendMessageDataType) {
        const value = JSON.stringify(data.data)
        const {idInstance, apiTokenInstance} = data
        return fetch(`${BASE_URL}${idInstance}/SendMessage/${apiTokenInstance}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: value
        });
    },
    getNotification(data: LoginDataType) {
        const {idInstance, apiTokenInstance} = data
        return fetch(`${BASE_URL}${idInstance}/ReceiveNotification/${apiTokenInstance}`);
    },
    deleteNotification(data: NotificationDataType) {
        const {idInstance, apiTokenInstance, receiptId} = data
        return fetch(`${BASE_URL}${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }
}