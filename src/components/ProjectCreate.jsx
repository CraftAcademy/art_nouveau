import {
  Box,
  VStack,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isArtist } from "../modules/userRoles";
const ProjectCreate = () => {
  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault()
    

    debugger;
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
                    />
                  </FormControl>
                  <Button
                    disabled
                    data-cy="project-submit"
                    type="submit"
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: "blue.500",
                    }}
                    isFullWidth
                  >
                    Create
                  </Button>
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
