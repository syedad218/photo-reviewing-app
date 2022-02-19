import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import reducer from "./reducer";
import rootSaga from "./saga";

export interface State {
  authenticated: boolean;
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
