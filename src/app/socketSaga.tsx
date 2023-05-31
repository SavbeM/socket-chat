import {put, call, takeEvery, take, select} from 'redux-saga/effects';
import {EventChannel, eventChannel} from 'redux-saga';
import {
    MessageType,
    receiveAllMessagesActionCreator,
    receiveMessageActionCreator,
    ReceiveMessageActionType
} from "./reducers/messagesReducer";
import {
    messageIsSendedActionCreator,
    setConnectionActionCreator,
    SetConnectionActionType
} from "./reducers/websocketReducer";

import {RootState} from "./store";
import {loginActionCreator, logoutActionCreator} from "./reducers/usersReducer";


type WebSocketAction = ReceiveMessageActionType | SetConnectionActionType  ;

let socket: WebSocket

let timeout = 5000



function keepAlive() {
    console.log(socket.readyState)
    if (socket.readyState === socket.OPEN)
    setTimeout(() => {
        socket.send(JSON.stringify({event: "ping"}))
        console.log("ping")
    }, timeout)
}



function* closeConnection() {

    const userId: string = yield select((state: RootState): string => state.users.currentUser.id);
     yield socket.send(JSON.stringify({data: userId, event: "close"}));
     yield timeout = 0
     yield socket.close(1000, "Closed by user")
}

function connectWebSocket(username: string, userId: string) {
    return new Promise<EventChannel<string>>((resolve) => {
        socket = new WebSocket("ws://localhost:5000");
        socket.onopen = async () => {
            keepAlive()
            const channel = eventChannel<string>((emitter) => {
                socket.onmessage = (message) => {
                    emitter(message.data as unknown as string);
                };

                socket.onclose = (event) => {
                   if(event.code === 1000) {
                       emitter("END")
                   }
                };
                socket.onerror = () => {

                }
                return () => {
                    socket.close()
                };
            });
            resolve(channel);
            await socket.send(JSON.stringify({data: username, event: "connection"}))
        };
    });
}

function* readWebSocket(channel: EventChannel<string>) {
    while (true) {
        const message: string = yield take(channel);
        if(message !== "END" ){
            const parsedMessage: any = JSON.parse(message)
            switch (parsedMessage.event) {
                case "connection":
                    yield put(loginActionCreator(parsedMessage.result))
                    break
                case "get-all-messages":
                    yield put(receiveAllMessagesActionCreator(parsedMessage.result))
                    break
                case "message":
                    yield put(receiveMessageActionCreator(parsedMessage.result))
                    console.log(parsedMessage.result)
                    break
                case "pong":
                    console.log("pong")
            }}
        else if(message === "END") {
            yield put(logoutActionCreator())
        }
    }
}



function* sendMessage() {
    const message: MessageType | null  = yield select((state: RootState):MessageType | null => state.websocket.messageToSend)
    if(message !== null) {
        yield socket.send(JSON.stringify({data: message, event: "message"}))
        put(messageIsSendedActionCreator())
    }
}

function* watchConnectWebSocket() {
    const username: string = yield select((state: RootState): string => state.users.currentUser.username);
    const userId: string = yield select((state: RootState): string => state.users.currentUser.id);
    const channel: EventChannel<string> = yield call(connectWebSocket, username, userId);
    yield put(setConnectionActionCreator())
    yield call(readWebSocket, channel);
}



function* webSocketSaga() {
    yield takeEvery("ASYNC-SET-CONNECTION", watchConnectWebSocket);
    yield takeEvery("SEND-MESSAGE", sendMessage)
    yield takeEvery("CLOSE-SOCKET", closeConnection)
}

export {webSocketSaga};
export type {WebSocketAction};
