import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import SignUp from "./auth/SignUp";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <SignUp message="You can't do that!" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
