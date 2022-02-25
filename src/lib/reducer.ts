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
  urls: {
    small: string;
    regular: string;
  };
}
export interface State {
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
    data: any;
    hasMore: boolean;
  };
}

export const initialState = {
  authenticated: false,
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
        // TODO: handle success
        draft.user.id = action.payload;
        draft.authenticated = true;
        break;
      case FETCH_RANDOM_IMAGE.START:
        draft.randomImages.loading = true;
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
        // @ts-ignore
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
