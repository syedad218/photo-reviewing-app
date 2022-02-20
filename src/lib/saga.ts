import { AxiosResponse } from "axios";
import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  authenticateUser,
  fetchUserProfile,
  fetchUserLikedImages,
  fetchRandomImage,
  likeImage,
  unlikeImage,
} from "./actions";
import {
  AUTHENTICATE_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_LIKED_IMAGES,
  FETCH_RANDOM_IMAGE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
} from "./actionTypes";
import request from "./api";
import { USER_AUTH_KEY, authorizationUrl } from "../constants";
import {
  makeSelectUsername,
  makeSelectImageId,
} from "../containers/ImageApproval/selectors";

function* authenticateUserStart() {
  const accessToken = localStorage.getItem(USER_AUTH_KEY);
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  if (code && accessToken) {
    searchParams.delete("code");
    window.history.replaceState({}, "", `${window.location.pathname}`);
    yield put(fetchUserProfile.start());
  } else if (accessToken) {
    yield put(fetchUserProfile.start());
  } else if (code) {
    try {
      const response: AxiosResponse = yield call(request, {
        method: "post",
        endpoint: "oauth/token",
        authEndpoint: true,
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
      yield put(fetchUserProfile.start());
    } catch (error) {
      yield put(authenticateUser.error());
    }
  } else {
    window.location.href = authorizationUrl;
  }
}

function* fetchUserProfileStart() {
  try {
    const access_token = localStorage.getItem(USER_AUTH_KEY);
    const response: AxiosResponse = yield call(request, {
      method: "get",
      endpoint: "me",
      config: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    });
    const { id, username } = response?.data ?? {};
    yield put(fetchUserProfile.success({ payload: { id, username } }));
  } catch (error) {
    yield put(fetchUserProfile.error());
  }
}

function* fetchUserLikedImagesStart() {
  try {
    const access_token = localStorage.getItem(USER_AUTH_KEY);
    const username: string = yield select(makeSelectUsername);
    const response: AxiosResponse = yield call(request, {
      method: "get",
      endpoint: `users/${username}/likes`,
      config: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          page: 1,
          per_page: 10,
        },
      },
    });
    const { data } = response || {};
    yield put(fetchUserLikedImages.success({ payload: data }));
  } catch (error) {
    yield put(fetchUserLikedImages.error());
  }
}

function* fetchRandomImageStart() {
  try {
    const access_token = localStorage.getItem(USER_AUTH_KEY);
    const response: AxiosResponse = yield call(request, {
      method: "get",
      endpoint: "photos/random",
      config: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          count: 30,
        },
      },
    });
    const { data } = response || {};
    yield put(fetchRandomImage.success({ payload: data }));
  } catch (error) {
    yield put(fetchRandomImage.error());
  }
}

function* likeImageStart() {
  try {
    const access_token = localStorage.getItem(USER_AUTH_KEY);
    const imageId: string = yield select(makeSelectImageId);
    yield call(request, {
      method: "post",
      endpoint: `photos/${imageId}/like`,
      config: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    });
    yield put(likeImage.success());
  } catch (error) {
    yield put(likeImage.error());
  }
}

function* unlikeImageStart() {
  try {
    const access_token = localStorage.getItem(USER_AUTH_KEY);
    const imageId: string = yield select(makeSelectImageId);
    yield call(request, {
      method: "delete",
      endpoint: `photos/${imageId}/like`,
      config: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    });
    yield put(unlikeImage.success());
  } catch (error) {
    yield put(unlikeImage.error());
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE_USER.START, authenticateUserStart);
  yield takeLatest(FETCH_USER_PROFILE.START, fetchUserProfileStart);
  yield takeLatest(FETCH_USER_LIKED_IMAGES.START, fetchUserLikedImagesStart);
  yield takeLatest(FETCH_RANDOM_IMAGE.START, fetchRandomImageStart);
  yield takeLatest(LIKE_IMAGE.START, likeImageStart);
  yield takeLatest(UNLIKE_IMAGE.START, unlikeImageStart);
}
