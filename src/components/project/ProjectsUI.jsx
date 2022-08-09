import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  AspectRatio,
  GridItem,
} from "@chakra-ui/react";

const ProjectsUI = ({ project, handleProjectNavigation }) => {
  return (
    <GridItem width={"100%"} style={{ cursor: "pointer" }}>
      <Box
        data-cy={`project-${project.id}-link`}
        onClick={() => handleProjectNavigation(project)}
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"50%"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <AspectRatio maxW={"100%"}>
            <Image
              objectFit={"cover"}
              src={"https://source.unsplash.com/random/?art"}
              layout={"fill"}
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Project
          </Text>
          <Heading
            data-cy={`project-${project.id}-link`}
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {project.title}
          </Heading>
          <Text color={"gray.500"}>{project.description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </GridItem>
  );
};

export default ProjectsUI;
