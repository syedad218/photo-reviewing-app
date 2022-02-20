import {
  AUTHENTICATE_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_LIKED_IMAGES,
  FETCH_RANDOM_IMAGE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
} from "./actionTypes";

export interface Action {
  type: string;
  payload: any;
}

export interface ActionType {
  START: string;
  SUCCESS: string;
  ERROR: string;
}

const createAction = (actionBaseType: ActionType) => ({
  start: (data?: any) => ({
    type: actionBaseType.START,
    metadata: data?.metadata,
  }),
  success: (data?: any) => ({
    type: actionBaseType.SUCCESS,
    payload: data?.payload,
  }),
  error: (error?: any) => ({ type: actionBaseType.ERROR, error }),
});

export const authenticateUser = createAction(AUTHENTICATE_USER);
export const fetchUserProfile = createAction(FETCH_USER_PROFILE);
export const fetchUserLikedImages = createAction(FETCH_USER_LIKED_IMAGES);
export const fetchRandomImage = createAction(FETCH_RANDOM_IMAGE);
export const likeImage = createAction(LIKE_IMAGE);
export const unlikeImage = createAction(UNLIKE_IMAGE);
