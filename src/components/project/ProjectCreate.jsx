import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { isArtist } from "../../modules/userRoles";
import { setMessage } from "../../state/features/messageSlice";
import ProjectCreateUI from "./ProjectCreateUI";

const ProjectCreate = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [inputsInvalid, setInputsInvalid] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (title && description) {
      setInputsInvalid(false);
    }
  }, [title, description]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/projects", {
        params: { title: title, description: description },
      });
      dispatch(setMessage([{ content: data.message, status: "success" }]));
      navigate(`/projects/${data.project.id}`, {
        replace: true,
        state: { project: data.project },
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((message) => {
          dispatch(setMessage([{ content: message, status: "error" }]));
        });
      } else {
        dispatch(
          setMessage([
            {
              content: `${error.message}, please try again later...`,
              status: "error",
            },
          ])
        );
      }
    }
  };
  return (
    <Container maxW={"7xl"}>
      {currentUser && isArtist(currentUser) ? (
        <ProjectCreateUI
          setTitle={setTitle}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          inputsInvalid={inputsInvalid}
        />
      ) : (
        <Navigate
          to={"/"}
          replace={true}
          state={{ message: "You can't do that as a developer" }}
        />
      )}
    </Container>
  );
};

export default ProjectCreate;
