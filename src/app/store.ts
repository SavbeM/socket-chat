import { configureStore} from '@reduxjs/toolkit';
import messagesReducer, {initialMessagesState} from "./reducers/messagesReducer";
import websocketReducer from "./reducers/websocketReducer";
import createSagaMiddleware from "redux-saga";
import {webSocketSaga} from "./socketSaga";
import usersReducer from "./reducers/usersReducer";


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    websocket: websocketReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(sagaMiddleware),
});


sagaMiddleware.run(webSocketSaga)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch