import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Stack
      data-cy="hero-section"
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        h={{ base: "100%", sm: "400px", lg: "500px" }}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text as={"span"} position={"relative"}>
              Connecting Artists and Developers
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Art Nouveau is a place for artists and developers to meet and
            collaborate on technology-based art projects.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ base: "100%", sm: "400px", lg: "500px" }}
          alt={"Example Project"}
          objectFit={"cover"}
          src={"https://source.unsplash.com/random/?art"}
        />
      </Flex>
    </Stack>
  );
};

export default Hero;
