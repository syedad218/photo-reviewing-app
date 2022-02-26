import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectUserId } from "../ImageApproval/selectors";
import { authenticateUser } from "../../lib/actions";
import ImageApproval from "../ImageApproval";
import PropagateLoader from "react-spinners/PropagateLoader";

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(makeSelectUserId);
  useEffect(() => {
    dispatch(authenticateUser.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) return <ImageApproval />;

  return <PropagateLoader color={"white"} loading={true} size={15} />;
};

export default AppContainer;
