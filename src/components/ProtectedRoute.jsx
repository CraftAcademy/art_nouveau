import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setMessage } from "../state/features/messageSlice";

const ProtectedRoute = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      dispatch(setMessage(["You can't do that!"]));
      navigate("/auth", { state: { originalRoute: location } });
    }
  }, [currentUser, location]);

  return <Outlet />;
};

export default ProtectedRoute;
