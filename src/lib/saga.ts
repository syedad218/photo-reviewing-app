import { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { authenticateUser } from "./actions";
import { AUTHENTICATE_USER } from "./actionTypes";
import { USER_AUTH_KEY } from "../constants";
import request from "./api";

function* authenticateUserStart(data: any) {
  const code = data?.metadata?.code;
  try {
    const response: AxiosResponse = yield call(request, {
      method: "post",
      endpoint: "oauth/token",
      config: {
        data: {
          client_id: process.env.REACT_APP_ACCESS_KEY,
          client_secret: process.env.REACT_APP_SECRET_KEY,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        },
      },
    });
    const { data } = response || {};
    const access_token = data?.access_token;
    localStorage.setItem(USER_AUTH_KEY, access_token);

    yield put(authenticateUser.success());
  } catch (error) {
    yield put(authenticateUser.error());
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE_USER.START, authenticateUserStart);
}
