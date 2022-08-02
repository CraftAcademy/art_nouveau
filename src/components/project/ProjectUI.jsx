import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
} from "@chakra-ui/react";
import { isDeveloper } from "../../modules/userRoles";

const ProjectUI = ({ project, currentUser }) => {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={"https://source.unsplash.com/random/?art"}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {project.title}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.600"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.400"} fontSize={"2xl"} fontWeight={"300"}>
                {project.description}
              </Text>
              <Text fontSize={"lg"}>{project.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"grey.400"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Details
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Timeframe</ListItem>
                  <ListItem>Some other info...</ListItem>{" "}
                </List>
                <List spacing={2}>
                  <ListItem>Urgent</ListItem>
                  <ListItem>More details...</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          {isDeveloper(currentUser) && (
            <Button
              data-cy="project-join"
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"gray.900"}
              color={"gray.50"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Join this project
            </Button>
          )}


        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default ProjectUI;
