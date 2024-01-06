import {
  Avatar,
  Box, Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import "./GamePage.css";

const ScoreBoard = () => {

  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      borderBottom={"3px solid #4299e1"}
      p={3}
    >
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={20} fontWeight={"500"}>
          Home
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          20
        </Text>
      </Flex>
      <Flex direction={"column"} alignItems={"center"} mx={3}>
        <Text fontSize={20} fontWeight={"500"}>
          Time
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          12:00
        </Text>
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={20} fontWeight={"500"}>
          Away
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          0
        </Text>
      </Flex>
    </Flex>
  );
};
const GamePage = () => {
  return (
    <Flex direction={"column"} flex={1} height={"100%"}>
      <Flex direction={"column"} overflow={"scroll"}>
        <Button>Do something useful</Button>
      </Flex>
    </Flex>
  );
};
export default GamePage;
