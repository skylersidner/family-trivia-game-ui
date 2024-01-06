import { useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { getGameById } from "../api/games";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dates";

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
  const [game, setGame] = useState<any>(null);
  const { gameId } = useParams();
  useEffect(() => {
    if (!gameId) return;
    getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }, []);
  const startDate = new Date(game?.startDate);
  return (
    <Flex direction={"column"}>
      <ScoreBoard />
      <Flex direction={"column"}>
        <Text>Title: {game?.title}</Text>
        <Text>Starts: {formatDate(startDate)}</Text>
        <Text>Current Players: {game?.currentPlayerCount}</Text>
        <Box>Questions</Box>
        {game?.questions.map((question: any) => (
          <Box key={question.id} mb={3}>
            <Text>{question.text}</Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
export default GamePage;
