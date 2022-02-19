const redirect_uri = "http://localhost:3000";
export const USER_AUTH_KEY = "access_token";

export const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_ACCESS_KEY}&redirect_uri=${redirect_uri}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes`;
