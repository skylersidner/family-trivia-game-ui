import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useClipboard,
  useColorModeValue,
  VStack,
  Checkbox,
  Text,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPerson, BsPhone } from "react-icons/bs";
import { MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";
import axios from "./utils/axios";
import { useToast } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import MESSAGE_OPTIONS from "./utils/message.options";

export default function ContactFormWithSocialButtons() {
  const { hasCopied, onCopy } = useClipboard("example@example.com");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySignedUp, setSuccessfullySignedUp] = useState(false);
  const toast = useToast();

  return (
    <Flex align="center" justify="center" id="contact-form">
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
        w={["100%", 600, 800]}
      >
        <Box w={"100%"}>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }}
              textAlign={"center"}
              paddingBottom={"40px"}
            >
              I've Heard Enough
            </Heading>

            <Box
              bg={useColorModeValue("white", "gray.700")}
              borderRadius="lg"
              p={8}
              color={useColorModeValue("gray.700", "whiteAlpha.900")}
              shadow="base"
              w="100%"
              border={"1px solid #E2E8F0"}
            >
              {successfullySignedUp && (
                <Text fontSize={15} fontWeight={600}>
                  Thank you for signing up. You should receive your confirmation
                  text momentarily.
                </Text>
              )}
              {!successfullySignedUp && (
                <VStack spacing={5}>
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
                        placeholder="Your Password"
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
                    onClick={() => {
                      setIsSubmitting(true);
                      axios
                        .post("/api/accounts/create", {
                          fullName,
                          email,
                          password,
                        })
                        .then((response) => {
                          setIsSubmitting(false);
                          setSuccessfullySignedUp(true);
                          toast({
                            position: "top",
                            title: "Sign up successful.",
                            description:
                              "We've created your account and signed you up!",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
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
                    }}
                  >
                    Sign Me Up
                  </Button>
                </VStack>
              )}
            </Box>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
