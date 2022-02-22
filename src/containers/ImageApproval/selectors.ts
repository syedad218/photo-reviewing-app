import { State } from "../../lib/reducer";

export const makeSelectUserId = (state: State) => state.user.id;
export const makeSelectImageId = (state: State) =>
  state.randomImages.data[state.currentImageIndex].id;
export const makeSelectRandomImages = (state: State) => state.randomImages.data;
export const makeSelectLikedImages = (state: State) => state.likedImages.data;
export const makeSelectCurrentImage = (state: State) =>
  state.randomImages.data[state.currentImageIndex];
