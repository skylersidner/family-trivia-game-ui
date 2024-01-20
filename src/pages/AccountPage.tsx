import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";
import { accountsService } from "../services/index";

const AccountPage = () => {
  let navigate = useNavigate();
  let { user, updateUser } = useAuth();
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);
  const toast = useToast();
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    if (!user) return;
    const payload = { fullName, email, password };
    accountsService
      .updateAccount(user, payload)
      .then(({ data }) => {
        setIsSubmitting(false);
        updateUser(data);
        toast({
          title: "Account Updated",
          description: "Your account has been updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((e) => {
        setIsSubmitting(false);
        const message =
          e?.response?.data?.message ||
          `Check your info and try again.  Fingers crossed`;
        toast({
          position: "top",
          title: "Well that didn't work",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Box
      as={"div"}
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <VStack spacing={5} bg={"white"} p={10} borderRadius="lg">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <InputGroup>
            <InputLeftElement children={<BsPerson />} />
            <Input
              value={fullName}
              type="text"
              name="name"
              id={"contact-form-name"}
              placeholder="Your Name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement children={<MdOutlineEmail />} />
            <Input
              value={email}
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement children={<MdOutlineVpnKey />} />
            <Input
              value={password}
              type="password"
              name="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          isLoading={isSubmitting}
          disabled={!fullName || !email}
          onClick={(event) => handleSubmit(event)}
        >
          Update Account
        </Button>
        <Text style={{ textAlign: "center" }} color={"gray.500"}>
          Utilizing this service is not a substitute for a qualified mental
          health professional
        </Text>
      </VStack>
    </Box>
  );
};

export default AccountPage;
