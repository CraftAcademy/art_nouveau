import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const Toast = () => {
  const toast = useToast();
  const { message } = useSelector((state) => state.messages);

  useEffect(() => {
    message.length > 0 && toast({ title: message[0].content, status: message[0].status });
  }, [message]);
};

export default Toast;
