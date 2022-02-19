import { AUTHENTICATE_USER } from "./actionTypes";

const createAction = (actionBaseType: string) => ({
  start: (data?: any) => ({
    type: AUTHENTICATE_USER.START,
    metadata: data?.metadata,
  }),
  success: (data?: any) => ({
    type: AUTHENTICATE_USER.SUCCESS,
    payload: data?.payload,
  }),
  error: (error?: any) => ({ type: AUTHENTICATE_USER.ERROR, error }),
});

export const authenticateUser = createAction(AUTHENTICATE_USER.BASE);
