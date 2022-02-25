import { State } from "../../lib/reducer";

export const makeSelectUserId = (state: State) => state.user.id;
export const makeSelectImageId = (state: State) =>
  state.randomImages.data[state.currentImageIndex].id;
export const makeSelectRandomImages = (state: State) => state.randomImages.data;
export const makeSelectIsLoadingRandomImages = (state: State) =>
  state.randomImages.loading;
export const makeSelectLikedImages = (state: State) => state.likedImages.data;
export const makeSelectIsUserLikedImageLoading = (state: State) =>
  state.likedImages.loading;
export const makeSelectHasMoreLikedImages = (state: State) =>
  state.likedImages.hasMore;
export const makeSelectLastFetchedLikedImage = (state: State) =>
  state.likedImages.data[state.likedImages.data.length - 1];
export const makeSelectCurrentImage = (state: State) =>
  state.randomImages.data[state.currentImageIndex];
export const makeSelectCurrentImageIndex = (state: State) =>
  state.currentImageIndex;
