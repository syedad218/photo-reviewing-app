import { State } from "../../lib/reducer";

export const makeSelectAuthenticated = (state: State) => state.authenticated;
export const makeSelectUsername = (state: State) => state.user.username;
export const makeSelectImageId = (state: State) =>
  state.randomImages.data[state.currentImageIndex].id;
export const makeSelectRandomImages = (state: State) => state.randomImages.data;
export const makeSelectLikedImages = (state: State) => state.likedImages.data;
export const makeSelectCurrentImage = (state: State) =>
  state.randomImages.data[state.currentImageIndex];
