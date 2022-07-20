import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { isArtist } from "../modules/userRoles";
import { setMessage } from "../state/features/messageSlice";
const CustomButton = ({ disabled }) => {
  return (
    <Button
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
  const [inputsInvalid, setInputsInvalid] = useState(true)
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (title && description) {
      setInputsInvalid(false)
    }
  }, [title, description])
  
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const title = event.target["title"].value;
    // const description = event.target["description"].value;

    const { data } = await axios.post("/projects", {
      params: { title: title, description: description },
    });
    dispatch(setMessage([{ content: data.message, status: "success" }]));
    navigate(`/projects/${data.project.id}`, {
      replace: true,
      state: { project: data.project },
    });
  };

  return (
    <>
      {currentUser && isArtist(currentUser) ? (
        <Box
          data-cy="project-create-ui"
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 8 }}
        >
          <Box>
            <Heading
              fontSize={{
                base: "3xl",
                md: "4xl",
              }}
              mb={{ lg: 10 }}
            >
              Create your project
            </Heading>

            <Box
              bg={"white"}
              borderRadius="lg"
              p={8}
              color={"gray.700"}
              shadow="base"
            >
              <VStack spacing={5}>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                  <CustomButton disabled={inputsInvalid} />
                </form>
              </VStack>
            </Box>
          </Box>
        </Box>
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
