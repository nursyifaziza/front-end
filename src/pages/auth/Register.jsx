import {
  Box,
  Button,
  FormControl,
  Input,
  Image,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

import Logo from "../../assets/radiate-logo.png";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [registrationType, setRegistrationType] = useState("user");

  const onSubmit = async (data) => {
    const dataForm = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      roles: registrationType,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();
      console.log(data);
      alert("berhasil mendaftar");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray100"
        h="100vh"
        flexDirection="column"
      >
        <RadioGroup
          value={registrationType}
          onChange={setRegistrationType}
          defaultValue="user"
        >
          <Stack direction="row">
            <Radio value="user">User</Radio>
            <Radio value="psychologist">Psychologist</Radio>
          </Stack>
        </RadioGroup>

        <Box
          w={["full", "md"]}
          p="50px 50px"
          bg="neutralW"
          borderRadius="20"
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={1} align="flex-start" w="full">
              <VStack spacing={1} align={["flex-start", " center"]} w="full">
                <Image src={Logo} height="60px" mb="48px" />
                <Text fontSize="30px" as="b">
                  Sign Up as {registrationType}
                </Text>
                <Text>Halaman register sementara</Text>
              </VStack>
            </VStack>

            <FormControl mb="20px" mt="32px">
              <Input
                type="text"
                variant="outline"
                rounded="10"
                placeholder="Fullname"
                {...register("fullName", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl mb="20px">
              <Input
                type="email"
                variant="outline"
                rounded="10"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </FormControl>

            <FormControl mb="16px">
              <Input
                type="password"
                variant="outline"
                rounded="10"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </FormControl>

            <Button
              type="submit"
              w="full"
              mt="20px"
              colorScheme="orange"
              bgColor="orange2"
              mb="10px"
            >
              Register
            </Button>
          </form>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            ke halaman login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
