import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { setCurrentUser } from "../../state/features/userSlice";
import { setMessage } from "../../state/features/messageSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const passwordConf = event.target["password-conf"].value;
    const roles = [];
    event.target["artist"].checked && roles.push("artist");
    event.target["developer"].checked && roles.push("developer");

    try {
      const { data } = await axios.post("/auth", {
        params: {
          email: email,
          password: password,
          passwordConf: passwordConf,
          roles: roles,
        },
      });

      dispatch(setCurrentUser(data.user));
      navigate(location.state.originalRoute.pathname);
    } catch (error) {
      const message = error.response.data.errors;
      dispatch(setMessage(message));
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create an account
          </Heading>
        </Stack>
        <Box
          data-cy="create-account-form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={(event) => handleSubmit(event)}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" data-cy="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    data-cy="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password confirmation</FormLabel>
                <InputGroup>
                  <Input
                    name="password-conf"
                    type={showPassword ? "text" : "password"}
                    data-cy="password-conf"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Account type</FormLabel>
                <Stack spacing={5} direction="row" data-cy="role">
                  <Checkbox data-cy="artist" name="artist">
                    Artist
                  </Checkbox>
                  <Checkbox data-cy="developer" name="developer">
                    Developer
                  </Checkbox>
                </Stack>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  data-cy="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
