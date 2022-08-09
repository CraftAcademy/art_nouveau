import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import ProjectSubmitButton from "./ProjectSubmitButton";

const ProjectCreateUI = ({
  setTitle,
  setDescription,
  handleSubmit,
  inputsInvalid,
}) => {
  return (
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
          <ProjectSubmitButton disabled={inputsInvalid} />
        </SimpleGrid>
      </form>
    </SimpleGrid>
  );
};

export default ProjectCreateUI;
