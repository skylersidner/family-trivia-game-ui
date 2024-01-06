import { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { getGameById } from "../api/games";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dates";

const ScoreBoard = ({ players }: { players: any[] }) => {
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      borderBottom={"3px solid"}
      borderBottomColor={"blue.400"}
      p={3}
    >
      {players.map((player) => {
        return <Avatar name={player.name} />;
      })}
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
      <ScoreBoard players={game?.players || []} />
      <Flex direction={"column"}>
        <Text>Title: {game?.title}</Text>
        <Text>Starts: {formatDate(startDate)}</Text>
        <Text mb={5}>Current Players: {game?.currentPlayerCount}</Text>
        <Divider height={"4px"} backgroundColor={"blue.400"} />
        <Box fontSize={"xl"} textAlign={"center"}>
          Questions
        </Box>
        {game?.questions.map((question: any) => (
          <Box key={question.id} mb={3}>
            <Text>{question.text}</Text>
            {question.answers.map((answer: any, index: number) => (
              <Flex key={answer.id}>
                <Text>{`${index + 1}: ${answer.text}`}</Text>
              </Flex>
            ))}
            <Divider height={"4px"} backgroundColor={"blue.400"} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
export default GamePage;
