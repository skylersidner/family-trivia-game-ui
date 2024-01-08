import { Component, useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import GamesAPI from "../api/games";
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

const Question = ({ question }: { question: any }) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");
  return (
    <Flex mb={10} mx={3} flexDirection={"column"}>
      <Text>{question.text}</Text>
      {question?.answers.map((answer: any, index: number) => {
        return (
          <Flex
            key={answer._id}
            onClick={() => setSelectedAnswerId(answer._id)}
            cursor={"pointer"}
          >
            <Text>
              {`${index + 1}: ${answer.text}`}
              {selectedAnswerId === answer._id && "✅"}
            </Text>
          </Flex>
        );
      })}
      <Button
        alignSelf={"center"}
        width={"100%"}
        maxW={"400px"}
        textAlign={"center"}
        onClick={() => {
          GamesAPI.submitAnswer({
            questionId: question._id,
            gameId: question._id,
            answerId: selectedAnswerId,
          });
        }}
      >
        Submit
      </Button>
    </Flex>
  );
};
const GamePage = () => {
  const [game, setGame] = useState<any>(null);
  const { gameId } = useParams();
  useEffect(() => {
    if (!gameId) return;
    GamesAPI.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  if (!game) return null;
  const startDate = new Date(game?.startDate);
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <ScoreBoard players={game?.players || []} />
      <Flex direction={"column"} maxW={"800px"}>
        <Text>Title: {game?.title}</Text>
        <Text>Starts: {formatDate(startDate)}</Text>
        <Text mb={5}>Current Players: {game?.currentPlayerCount}</Text>
        <Divider height={"4px"} backgroundColor={"blue.400"} />
        <Box fontSize={"xl"} textAlign={"center"}>
          Questions
        </Box>
        {game?.questions.map((question: any) => (
          <Question key={question.id} question={question} />
        ))}
      </Flex>
    </Flex>
  );
};
export default GamePage;
