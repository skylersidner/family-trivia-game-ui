import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./components/AuthContext";
import { IoArrowBack } from "react-icons/io5";

const Banner = () => {
  let auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasAvailability, setHasAvailability] = useState<
    undefined | true | false
  >(undefined);

  return (
    <Box
      bg="blue.400"
      py={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"sticky"}
      top={0}
      zIndex={1}
    >
      {location.pathname !== "/" && (
        <Box pl={2} onClick={() => navigate(-1)} cursor={"pointer"}>
          <IoArrowBack color={"white"} size={40} />
        </Box>
      )}
      <Spacer />
      <Flex pr={"20px"} alignItems={"center"}>
        <Button
          onClick={() => {
            navigate("/games");
          }}
          mr={3}
        >
          Games
        </Button>
        {!!auth?.user && (
          <Popover>
            <PopoverTrigger>
              <div style={{ cursor: "pointer" }}>
                <Avatar
                  name={auth.user.fullName}
                  src="https://bit.ly/broken-link"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent w={"200px"}>
              <PopoverCloseButton />
              <PopoverBody
                display={"flex"}
                justifyContent={"end"}
                mt={7}
                flexDirection={"column"}
              >
                <Button
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  Account
                </Button>
                <Button
                  variant={"ghost"}
                  mt={3}
                  onClick={() => auth.signOut(() => {})}
                >
                  Log Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        {!auth.user && (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};
export default Banner;
