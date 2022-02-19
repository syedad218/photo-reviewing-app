import { AUTHENTICATE_USER } from "./actionTypes";
import produce from "immer";

interface Action {
  type: string;
  payload: any;
}

export const initialState = {
  authenticated: false,
};

const reducer = (state = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTHENTICATE_USER.SUCCESS:
        draft.authenticated = true;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
