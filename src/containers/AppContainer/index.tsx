import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectUsername } from "../ImageApproval/selectors";
import { authenticateUser } from "../../lib/actions";
import ImageApproval from "../ImageApproval";

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(makeSelectUsername);

  useEffect(() => {
    dispatch(authenticateUser.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   return <div>{isAuthenticated ? <ImageApproval /> : <h3>Loading...</h3>}</div>;
  return (
    <div>
      <ImageApproval />
    </div>
  );
};

export default AppContainer;
