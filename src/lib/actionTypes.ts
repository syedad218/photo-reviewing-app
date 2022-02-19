const defineActionTypes = (actionBaseType: string) => ({
  START: `${actionBaseType}_START`,
  SUCCESS: `${actionBaseType}_SUCCESS`,
  ERROR: `${actionBaseType}_FAILURE`,
  BASE: actionBaseType,
});

export const AUTHENTICATE_USER = defineActionTypes("AUTHENTICATE_USER");
