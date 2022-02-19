import { initialState } from "./store";

interface Action {
  type: string;
  payload: any;
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
