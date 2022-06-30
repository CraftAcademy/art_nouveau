import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    debugger
    return <Text fontSize={24}>You can't do that!</Text>;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
