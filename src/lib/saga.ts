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
  FETCH_USER_LIKED_IMAGES,
  FETCH_RANDOM_IMAGE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
} from "./actionTypes";
import request from "./api";
import {
  makeSelectUserId,
  makeSelectCurrentImage,
  makeSelectLikedImages,
  makeSelectCurrentImageIndex,
  makeSelectRandomImages,
  makeSelectLastFetchedLikedImage,
  makeSelectHasMoreLikedImages,
} from "../containers/ImageApproval/selectors";
import {
  login,
  createUserDoc,
  fetchRadomImages,
  iterateImages,
  updateLikedImages,
  updateCurrentImageIndex,
  fetchLikedImages,
  setDislikedImages,
  removeLikedImage,
  findDislikedImages,
} from "./firestoreService";

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

function* fetchRandomImageStart(data: any) {
  try {
    const { metadata } = data || {};
    const { apiOnly } = metadata || {};
    const userId: string = yield select(makeSelectUserId);
    console.log(userId);
    // ts-ignore TODO: fix this
    let imagesonFirebase = {};
    if (!apiOnly) {
      imagesonFirebase = yield call(fetchRadomImages, userId);
    }
    // @ts-ignore
    let processedData = imagesonFirebase?.randomImages ?? [];
    if (processedData.length === 0) {
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
      const imageIds = data?.map((img: any) => img.id) ?? [];
      // console.log(imageIds);
      // @ts-ignore
      const dislikedImageMatches = yield call(
        findDislikedImages,
        userId,
        imageIds
      );
      // @ts-ignore
      console.log("dislikedImageMatches", dislikedImageMatches);
      const filteredImages = data.filter(
        (image: any) => !dislikedImageMatches.includes(image.id)
      );
      console.log("filteredImages", filteredImages.length);
      processedData = iterateImages(filteredImages, userId);
    }
    yield put(
      fetchRandomImage.success({
        payload: {
          images: processedData,
          // @ts-ignore
          currentRandomImageIndex: imagesonFirebase?.currentRandomImageIndex,
        },
      })
    );
  } catch (error) {
    console.log(error);
    yield put(fetchRandomImage.error());
  }
}

function* fetchUserLikedImagesStart(data: any) {
  try {
    const userId: string = yield select(makeSelectUserId);
    // @ts-ignore
    const lastDoc: any = yield select(makeSelectLastFetchedLikedImage);
    // @ts-ignore
    const { likedImages, hasMore } = yield fetchLikedImages(userId, lastDoc);
    // @ts-ignore
    const existingLikedImages: any = yield select(makeSelectLikedImages);
    yield put(
      fetchUserLikedImages.success({
        payload: {
          likedImages: existingLikedImages.concat(likedImages),
          hasMore,
        },
      })
    );
  } catch (error) {
    yield put(fetchUserLikedImages.error());
  }
}

function* likeImageStart() {
  try {
    const userId: string = yield select(makeSelectUserId);
    // @ts-ignore
    const image: any = yield select(makeSelectCurrentImage);
    const currentImageIndex: number = yield select(makeSelectCurrentImageIndex);
    // @ts-ignore
    const randomImages: any = yield select(makeSelectRandomImages);
    const isLastRandomImage = currentImageIndex === randomImages.length - 1;
    // @ts-ignore
    const likedImages: any = yield select(makeSelectLikedImages);

    // incorrect because i'm only checking locally if it exists or not???? :thinking_face:
    const imageIndex = likedImages.findIndex((img: any) => img.id === image.id);
    let payload = [...likedImages] ?? [];

    // @ts-ignore
    const likedImageSnap: any = yield call(updateLikedImages, userId, image);

    if (imageIndex === -1) {
      payload = [likedImageSnap, ...likedImages];
    } else {
      const existingImage = payload.splice(imageIndex, 1);
      payload = [likedImageSnap, ...payload];
    }
    yield put(likeImage.success({ payload }));

    if (isLastRandomImage) {
      updateCurrentImageIndex(userId, false);
      yield put(fetchRandomImage.start({ metadata: { apiOnly: true } }));
    } else {
      updateCurrentImageIndex(userId);
    }
  } catch (error) {
    console.log(error);
    yield put(likeImage.error());
  }
}

function* unlikeImageStart() {
  try {
    const userId: string = yield select(makeSelectUserId);
    // @ts-ignore
    const image: any = yield select(makeSelectCurrentImage);
    const currentImageIndex: number = yield select(makeSelectCurrentImageIndex);
    // @ts-ignore
    const randomImages: any = yield select(makeSelectRandomImages);
    const isLastRandomImage = currentImageIndex === randomImages.length - 1;
    // @ts-ignore
    const likedImages: any = yield select(makeSelectLikedImages);
    const hasMore: boolean = yield select(makeSelectHasMoreLikedImages);
    // incorrect because i'm only checking locally if it exists or not???? :thinking_face:
    const imageIndex = likedImages.findIndex((img: any) => img.id === image.id);
    const payload = [...likedImages];
    if (imageIndex !== -1) {
      const existingImage = payload.splice(imageIndex, 1);
      yield put(
        fetchUserLikedImages.success({
          payload: { likedImages: payload, hasMore },
        })
      );
      removeLikedImage(userId, image.id);
    }
    if (isLastRandomImage) {
      updateCurrentImageIndex(userId, false);
      yield put(fetchRandomImage.start({ metadata: { apiOnly: true } }));
    } else {
      updateCurrentImageIndex(userId);
    }
    setDislikedImages(userId, image);
    yield put(unlikeImage.success());
  } catch (error) {
    console.log(error);
    yield put(unlikeImage.error());
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE_USER.START, authenticateUserStart);
  yield takeLatest(FETCH_USER_LIKED_IMAGES.START, fetchUserLikedImagesStart);
  yield takeLatest(FETCH_RANDOM_IMAGE.START, fetchRandomImageStart);
  yield takeLatest(LIKE_IMAGE.START, likeImageStart);
  yield takeLatest(UNLIKE_IMAGE.START, unlikeImageStart);
}
