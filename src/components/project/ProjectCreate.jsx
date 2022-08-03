import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Textarea,
  Button,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { isArtist } from "../../modules/userRoles";
import { setMessage } from "../../state/features/messageSlice";

const SubmitButton = ({ disabled }) => {
  return (
    <Button
      width={{ base: "100%", lg: "200px" }}
      disabled={disabled}
      data-cy="project-submit"
      type="submit"
      colorScheme="blue"
      bg="blue.400"
      color="white"
      _hover={{
        bg: "blue.500",
      }}
    >
      Create
    </Button>
  );
};

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
    <>
      {currentUser && isArtist(currentUser) ? (
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 1 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                Create Your Project Here
              </Heading>
            </Box>
            <form onSubmit={(e) => handleSubmit(e)}>
              <SimpleGrid columns={1} spacing={5} data-cy="project-create-ui">
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <InputGroup>
                    <Input
                      data-cy="project-title"
                      type="text"
                      name="title"
                      placeholder="Your projet's title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>

                  <Textarea
                    data-cy="project-description"
                    name="description"
                    placeholder="Describe your project"
                    rows={6}
                    resize="none"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <SubmitButton disabled={inputsInvalid} />
              </SimpleGrid>
            </form>
          </SimpleGrid>
        </Container>
      ) : (
        <Navigate
          to={"/"}
          replace={true}
          state={{ message: "You can't do that as a developer" }}
        />
      )}
    </>
  );
};

export default ProjectCreate;
