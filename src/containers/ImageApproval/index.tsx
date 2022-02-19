import { FC, useEffect } from "react";
import { USER_AUTH_KEY, authorizationUrl } from "../../constants";
import { authenticated } from "./selectors";
import { useSelector } from "react-redux";

interface Props {}

const ImageApproval: FC<Props> = ({}) => {
  const isAuthenticated = useSelector(authenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem(USER_AUTH_KEY);
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    // if (code && accessToken) {
    //   searchParams.delete("code");
    // } else if (accessToken) {
    //   // set authenticated to true
    // } else {
    //   window.location.href = authorizationUrl;
    // }
  }, []);
  return (
    <h1>{isAuthenticated ? "YIpeee!!!" : "Please Authenticate the user"}</h1>
  );
};

export default ImageApproval;
