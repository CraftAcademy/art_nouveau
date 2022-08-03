import { Button } from "@chakra-ui/react";

const ProjectSubmitButton = ({ disabled }) => {
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

export default ProjectSubmitButton;
