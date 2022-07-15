import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const Toast = () => {
  const toast = useToast();
  const { content } = useSelector((state) => state.messages);

  useEffect(() => {
    content.length > 0 && toast({ title: content[0], status: "error" });
  }, [content]);
};

export default Toast;
