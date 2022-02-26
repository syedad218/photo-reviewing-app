import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectUserId } from "../ImageApproval/selectors";
import { authenticateUser } from "../../lib/actions";
import ImageApproval from "../ImageApproval";
import ScaleLoader from "react-spinners/ScaleLoader";

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(makeSelectUserId);
  useEffect(() => {
    dispatch(authenticateUser.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) return <ImageApproval />;

  return <ScaleLoader color={"white"} loading={true} height={35} width={6} />;
};

export default AppContainer;
