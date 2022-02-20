import { AUTHENTICATE_USER, FETCH_USER_PROFILE } from "./actionTypes";
import produce from "immer";
import { Action } from "./actions";
export interface State {
  authenticated: boolean;
  user: {
    id: string;
    username: string;
  };
}

export const initialState = {
  authenticated: false,
  user: {
    id: null,
    username: null,
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
      default:
        return state;
    }
  });
};

export default reducer;
