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
import { makeSelectUserId } from "../containers/ImageApproval/selectors";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const login = async () => {
  const response = await signInAnonymously(auth);
  return response?.user?.uid;
};

const createUserDoc = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return;
  } else {
    setDoc(docRef, { id: userId });
  }
};

const createRandomImageDoc = async (
  userId: string,
  imageId: string,
  urls: any,
  batch: any
) => {
  const docRef = doc(db, `users/${userId}/randomImages`, imageId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return false;
  } else {
    batch.set(docRef, { id: imageId, urls });
    return true;
  }
};

const fetchRadomImages = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  let randomImages: any = [];
  if (docSnap.exists()) {
    randomImages = docSnap.data()?.randomImages || [];
  } else {
    // do nothing
  }
  console.log("random-images", randomImages);
  return randomImages;
};

const iterateImages = (data: any, userId: string) => {
  const processedData = data.map((image: any) => ({
    id: image.id,
    urls: { small: image.urls.small, regular: image.urls.regular },
  }));
  const userRef = doc(db, "users", userId);
  updateDoc(userRef, { randomImages: processedData });
  return processedData;
};

function* authenticateUserStart() {
  try {
    const userId: string = yield call(login);
    yield call(createUserDoc, userId);
    yield put(authenticateUser.success({ payload: userId }));
  } catch (error) {
    console.log("error in authentication", error);
    yield put(authenticateUser.error());
    // do nothing
  }
}

function* fetchRandomImageStart() {
  try {
    const userId: string = yield select(makeSelectUserId);
    console.log(userId);
    // ts-ignore TODO: fix this
    const randomImages: string = yield call(fetchRadomImages, userId);
    let processedData = randomImages;
    if (randomImages.length === 0) {
      const response: AxiosResponse = yield call(request, {
        method: "get",
        endpoint: "photos/random",
        config: {
          params: {
            count: 30,
            client_id: process.env.REACT_APP_ACCESS_KEY,
          },
        },
      });
      const { data } = response || {};
      processedData = iterateImages(data, userId);
      console.log("processedData", processedData);
    }
    yield put(fetchRandomImage.success({ payload: processedData }));
  } catch (error) {
    // yield put(fetchRandomImage.error());
  }
}

function* fetchUserLikedImagesStart() {
  try {
    // const access_token = localStorage.getItem(USER_AUTH_KEY);
    // const username: string = yield select(makeSelectUsername);
    // const response: AxiosResponse = yield call(request, {
    //   method: "get",
    //   endpoint: `users/${username}/likes`,
    //   config: {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //     params: {
    //       page: 1,
    //       per_page: 10,
    //     },
    //   },
    // });
  } catch (error) {}
}

function* likeImageStart() {
  try {
    // const access_token = localStorage.getItem(USER_AUTH_KEY);
    // const imageId: string = yield select(makeSelectImageId);
    // yield call(request, {
    //   method: "post",
    //   endpoint: `photos/${imageId}/like`,
    //   config: {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   },
    // });
    // yield put(likeImage.success());
  } catch (error) {
    // yield put(likeImage.error());
  }
}

function* unlikeImageStart() {
  try {
    // const access_token = localStorage.getItem(USER_AUTH_KEY);
    // const imageId: string = yield select(makeSelectImageId);
    // yield call(request, {
    //   method: "delete",
    //   endpoint: `photos/${imageId}/like`,
    //   config: {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   },
    // });
    // yield put(unlikeImage.success());
  } catch (error) {
    // yield put(unlikeImage.error());
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE_USER.START, authenticateUserStart);
  yield takeLatest(FETCH_USER_LIKED_IMAGES.START, fetchUserLikedImagesStart);
  yield takeLatest(FETCH_RANDOM_IMAGE.START, fetchRandomImageStart);
  yield takeLatest(LIKE_IMAGE.START, likeImageStart);
  yield takeLatest(UNLIKE_IMAGE.START, unlikeImageStart);
}
