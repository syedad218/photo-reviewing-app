import { put, takeLatest } from "redux-saga/effects";
import { authenticateUser } from "./actions";
import { AUTHENTICATE_USER } from "./actionTypes";

function* authenticateUserStart() {
  yield put(authenticateUser.success({}));
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE_USER.START, authenticateUserStart);
}
