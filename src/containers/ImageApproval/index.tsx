import { FC, useEffect } from "react";
import { USER_AUTH_KEY, authorizationUrl } from "../../constants";
import { authenticated } from "./selectors";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "../../lib/actions";

interface Props {}

const ImageApproval: FC<Props> = ({}) => {
  const isAuthenticated = useSelector(authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem(USER_AUTH_KEY);
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (code && accessToken) {
      searchParams.delete("code");
      window.history.replaceState({}, "", `${window.location.pathname}`);
      dispatch(authenticateUser.success());
    } else if (accessToken) {
      dispatch(authenticateUser.success());
    } else if (code) {
      dispatch(authenticateUser.start({ metadata: { code } }));
    } else {
      window.location.href = authorizationUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{isAuthenticated ? "YIpeee!!!" : "Please Authenticate the user"}</h1>
    </>
  );
};

export default ImageApproval;
