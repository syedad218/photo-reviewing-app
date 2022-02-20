import { State } from "../../lib/reducer";

export const makeSelectAuthenticated = (state: State) => state.authenticated;
export const makeSelectUsername = (state: State) => state.user.username;
