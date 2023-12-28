import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";
import { GiNuclearBomb } from "react-icons/gi";
import { Select } from "chakra-react-select";
import MESSAGE_OPTIONS, {
  getMessageOptionFromValue,
} from "../utils/message.options";
import DELIVERY_TIME_OPTIONS, {
  getDeliveryTimeOptionFromValue,
} from "../utils/delivery.time.options";

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
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [messageOption, setMessageOption] = useState(
    getMessageOptionFromValue(user?.messageTypes[0]) ||
      MESSAGE_OPTIONS.SELF_AFFIRMATIONS
  );
  const [useSwearWords, setUseSwearWords] = useState(user.useSwearWords);
  const [deliveryTimeOption, setDeliveryTimeOption] = useState(
    getDeliveryTimeOptionFromValue(user?.deliveryTimeOptions) ||
      DELIVERY_TIME_OPTIONS.MORNING
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    axios
      .post(`/api/account/update/${user._id}`, {
        fullName,
        email,
        phoneNumber,
        messageTypes: [messageOption.value],
        deliveryTime: deliveryTimeOption.value,
        password,
        useSwearWords,
      })
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

        <FormControl isRequired>
          <FormLabel>Phone Number (US Only)</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+1" />
            <Input
              value={phoneNumber}
              type="phone"
              name="phone"
              placeholder="Your Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Kind of Message</FormLabel>
          <Select
            name="message-type"
            options={Object.values(MESSAGE_OPTIONS)}
            value={messageOption}
            closeMenuOnSelect={true}
            onChange={(option) => setMessageOption(option!)}
          />
        </FormControl>
        {messageOption.value === MESSAGE_OPTIONS.HYPE.value && (
          <FormControl isRequired>
            <FormLabel>Include F Bomb</FormLabel>
            <Checkbox
              size="lg"
              colorScheme="red"
              icon={<GiNuclearBomb />}
              name="use-swear-words"
              isChecked={useSwearWords}
              onChange={(e) => setUseSwearWords(e.target.checked)}
            />
          </FormControl>
        )}
        <FormControl isRequired>
          <FormLabel>Delivery Time</FormLabel>
          <Select
            name="delivery-time"
            options={Object.values(DELIVERY_TIME_OPTIONS)}
            value={deliveryTimeOption}
            closeMenuOnSelect={true}
            onChange={(option) => setDeliveryTimeOption(option!)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          isLoading={isSubmitting}
          disabled={!phoneNumber || !fullName || !email}
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
