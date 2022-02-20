const defineActionTypes = (actionBaseType: string) => ({
  START: `${actionBaseType}_START`,
  SUCCESS: `${actionBaseType}_SUCCESS`,
  ERROR: `${actionBaseType}_FAILURE`,
});

export const AUTHENTICATE_USER = defineActionTypes("AUTHENTICATE_USER");
export const FETCH_USER_PROFILE = defineActionTypes("FETCH_USER_PROFILE");
export const FETCH_USER_LIKED_IMAGES = defineActionTypes(
  "FETCH_USER_LIKED_IMAGES"
);
export const FETCH_RANDOM_IMAGE = defineActionTypes("FETCH_RANDOM_IMAGE");
