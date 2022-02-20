import {
  AUTHENTICATE_USER,
  FETCH_RANDOM_IMAGE,
  FETCH_USER_LIKED_IMAGES,
  FETCH_USER_PROFILE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
} from "./actionTypes";
import produce from "immer";
import { Action } from "./actions";

interface Image {
  id: string;
  url: {
    small: string;
    regular: string;
  };
}
export interface State {
  authenticated: boolean;
  user: {
    id: string;
    username: string;
  };
  randomImages: {
    loading: boolean;
    error: string;
    data: Array<Image>;
  };
  currentImageIndex: number;
  likedImages: {
    loading: boolean;
    error: string;
    data: Array<Image>;
    currentPage: number;
  };
}

export const initialState = {
  authenticated: false,
  user: {
    id: null,
    username: null,
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
    currentPage: 1,
  },
};

const reducer = (state = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTHENTICATE_USER.SUCCESS:
        // TODO: handle success
        break;
      case FETCH_USER_PROFILE.SUCCESS:
        draft.user = action.payload;
        draft.authenticated = true;
        break;
      case FETCH_RANDOM_IMAGE.SUCCESS:
        draft.randomImages.data = action.payload;
        draft.randomImages.loading = false;
        draft.randomImages.error = null;
        break;
      case FETCH_USER_LIKED_IMAGES.SUCCESS:
        draft.likedImages.data = draft.likedImages.data.concat(action.payload);
        break;
      case LIKE_IMAGE.SUCCESS:
        draft.likedImages.data.push(
          draft.randomImages.data[draft.currentImageIndex]
        );
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
