import { AxiosResponse } from "axios";
import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  authenticateUser,
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
import { Image } from "./types";

function* authenticateUserStart() {
  try {
    const userId: string = yield call(login);
    yield call(createUserDoc, userId);
    yield put(authenticateUser.success({ payload: userId }));
  } catch (error) {
    console.log("error in authentication", error);
    yield put(authenticateUser.error());
  }
}

function* fetchRandomImageStart(data: any) {
  try {
    const { metadata } = data || {};
    const { apiOnly, initialCheck } = metadata || {};
    const userId: string = yield select(makeSelectUserId);
    let imagesonFirebase = { randomImages: null, currentRandomImageIndex: null };
    if (!apiOnly) {
      imagesonFirebase = yield call(fetchRadomImages, userId);
    }
    let processedData: Array<Image> | [] = imagesonFirebase?.randomImages ?? [];

    if (processedData?.length === 0 && !initialCheck) {
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
      const imageIds = data?.map((img: Image) => img.id) ?? [];

      const dislikedImageMatches: Array<string> | [] = yield call(
        findDislikedImages,
        userId,
        imageIds
      );

      const filteredImages: Array<Image> | [] = data?.filter(
        // @ts-ignore
        (image: Image) => !dislikedImageMatches.includes(image.id)
      );

      processedData = iterateImages(filteredImages, userId);
    }
    yield put(
      fetchRandomImage.success({
        payload: {
          images: processedData,
          currentRandomImageIndex: imagesonFirebase?.currentRandomImageIndex,
        },
      })
    );
  } catch (error) {
    console.log("error in fetchRandomImage", error);
    yield put(fetchRandomImage.error());
  }
}

function* fetchUserLikedImagesStart(data: any) {
  try {
    const userId: string = yield select(makeSelectUserId);
    const lastDoc: Image = yield select(makeSelectLastFetchedLikedImage);
    const { likedImages, hasMore } = yield fetchLikedImages(userId, lastDoc);
    const existingLikedImages: Image[] = yield select(makeSelectLikedImages);
    yield put(
      fetchUserLikedImages.success({
        payload: {
          likedImages: existingLikedImages.concat(likedImages),
          hasMore,
        },
      })
    );
  } catch (error) {
    console.log("error in fetchUserLikedImages", error);
    yield put(fetchUserLikedImages.error());
  }
}

function* likeImageStart() {
  try {
    const userId: string = yield select(makeSelectUserId);
    const image: Image = yield select(makeSelectCurrentImage);
    const currentImageIndex: number = yield select(makeSelectCurrentImageIndex);
    const randomImages: Image[] = yield select(makeSelectRandomImages);
    const isLastRandomImage = currentImageIndex === randomImages.length - 1;
    const likedImages: Image[] = yield select(makeSelectLikedImages);
    const imageIndex = likedImages.findIndex((img: any) => img.id === image.id);
    let payload = [...likedImages] ?? [];

    if (imageIndex === -1) {
      payload = [image, ...likedImages];
    } else {
      const existingImage = payload.splice(imageIndex, 1);
      payload = [existingImage[0], ...payload];
    }

    updateLikedImages(userId, image);
    yield put(likeImage.success({ payload }));
    if (isLastRandomImage) {
      updateCurrentImageIndex(userId, false);
      yield put(fetchRandomImage.start({ metadata: { apiOnly: true } }));
    } else {
      updateCurrentImageIndex(userId);
    }
  } catch (error) {
    console.log("error in likeImage", error);
    yield put(likeImage.error());
  }
}

function* unlikeImageStart() {
  try {
    const userId: string = yield select(makeSelectUserId);
    const image: Image = yield select(makeSelectCurrentImage);
    const currentImageIndex: number = yield select(makeSelectCurrentImageIndex);
    const randomImages: Image[] = yield select(makeSelectRandomImages);
    const isLastRandomImage = currentImageIndex === randomImages.length - 1;
    const likedImages: Image[] = yield select(makeSelectLikedImages);
    const hasMore: boolean = yield select(makeSelectHasMoreLikedImages);
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
    console.log("error in dislikeImage", error);
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
