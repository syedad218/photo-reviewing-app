import {
  AUTHENTICATE_USER,
  FETCH_RANDOM_IMAGE,
  FETCH_USER_LIKED_IMAGES,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
} from "./actionTypes";
import produce from "immer";
import { Action } from "./actions";
import { State } from "./types";

export const initialState: State = {
  user: {
    id: null,
  },
  randomImages: {
    loading: false,
    error: null,
    data: [],
  },
  currentImageIndex: 0,
  likedImages: {
    loading: false,
    error: null,
    data: [],
    hasMore: true,
  },
};

const reducer = (state = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTHENTICATE_USER.SUCCESS:
        draft.user.id = action.payload;
        break;
      case FETCH_RANDOM_IMAGE.START:
        draft.randomImages.loading = true;
        draft.randomImages.error = null;
        break;
      case FETCH_RANDOM_IMAGE.SUCCESS:
        draft.randomImages.data = action.payload.images;
        draft.currentImageIndex = action.payload.currentRandomImageIndex || 0;
        draft.randomImages.loading = false;
        draft.randomImages.error = null;
        break;
      case FETCH_USER_LIKED_IMAGES.START:
        draft.likedImages.loading = true;
        break;
      case FETCH_USER_LIKED_IMAGES.SUCCESS:
        draft.likedImages.data = action.payload.likedImages;
        draft.likedImages.hasMore = action.payload.hasMore;
        draft.likedImages.loading = false;
        break;
      case FETCH_USER_LIKED_IMAGES.ERROR:
        draft.likedImages.loading = false;
        break;
      case LIKE_IMAGE.SUCCESS:
        draft.likedImages.data = action.payload;
        draft.currentImageIndex = draft.currentImageIndex + 1;
        break;
      case UNLIKE_IMAGE.SUCCESS:
        draft.currentImageIndex = draft.currentImageIndex + 1;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
