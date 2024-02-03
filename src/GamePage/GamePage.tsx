import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { pull } from "lodash";
import { gamesService } from "../services";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dates";
import { useAuth } from "../components/AuthContext";
import { CheckIcon } from "@chakra-ui/icons";
import { IQuestion } from "../models/question";
import { IAnswer } from "../models/answer";

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
        return <Avatar key={player._id} name={player.name} />;
      })}
    </Flex>
  );
};

const Question = ({
  question,
  game,
  user,
  setGame,
}: {
  question: any;
  game: any;
  user: any;
  setGame: any;
}) => {
  const toast = useToast();
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<string[]>([]);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [currentAnswerIds, setCurrentAnswerIds] = useState<any>([]);
  useEffect(() => {
    const currentAnswers = question?.answers.filter((answer: any) =>
      answer.selectedBy?.map((user: any) => user._id).includes(user._id)
    );
    if (!currentAnswers.length) return;
    setSelectedAnswerIds(currentAnswers.map((answer: any) => answer._id));
    setAnswerSubmitted(true);
    setCurrentAnswerIds(currentAnswers.map((answer: any) => answer._id));
  }, [question]);
  return (
    <Flex mb={10} mx={3} flexDirection={"column"}>
      <Text>{question.text}</Text>
      {question?.answers.map((answer: IAnswer) => {
        const answerId = answer._id as string;
        return (
          <Flex key={answer._id} cursor={"pointer"}>
            <Checkbox
              isChecked={selectedAnswerIds.includes(answer._id!)}
              onChange={() => {
                if (question.type === "SELECT_ONE") {
                  setSelectedAnswerIds([answerId]);
                  return;
                }
                if (question.type === "SELECT_MANY") {
                  if (selectedAnswerIds.includes(answerId)) {
                    const updatedAnswerIds = pull(
                      [...selectedAnswerIds],
                      answerId
                    );
                    setSelectedAnswerIds(updatedAnswerIds);
                  } else {
                    const updatedAnswerIds = [...selectedAnswerIds, answerId];
                    setSelectedAnswerIds(updatedAnswerIds);
                  }
                  return;
                }
              }}
            >
              <Flex alignItems={"center"}>
                {answer.isCorrect && (
                  <CheckIcon marginRight={2} color={"green.700"} />
                )}
                {answer.text}
                {currentAnswerIds.includes(answer._id) && (
                  <Text color={"blue.400"} display={"inline"}>
                    - submitted
                  </Text>
                )}
              </Flex>
            </Checkbox>
          </Flex>
        );
      })}
      {game?.status !== "FINISHED" && (
        <Button
          alignSelf={"center"}
          width={"100%"}
          disabled={!selectedAnswerIds.length}
          maxW={"400px"}
          textAlign={"center"}
          onClick={() => {
            gamesService
              .submitAnswer({
                questionId: question._id,
                gameId: game._id,
                answerIds: selectedAnswerIds,
              })
              .then(({ data }) => {
                setGame(data);
              })
              .catch((err) => {
                toast({
                  title: "Error",
                  description: err.response.data.message,
                  status: "error",
                  duration: 9000,
                  position: "top",
                  isClosable: true,
                });
              });
          }}
        >
          {answerSubmitted ? "Update Answer" : "Submit Answer"}
        </Button>
      )}
    </Flex>
  );
};
const GamePage = () => {
  const { user } = useAuth();
  const [game, setGame] = useState<any>(null);
  const { gameId } = useParams();
  const startDate = new Date(game?.startDate);
  useEffect(() => {
    if (!gameId) return;
    getCurrentGame(gameId);
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!game) return null;

  function getCurrentGame(gameId: string) {
    gamesService.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"}>Game Status: {game?.status}</Text>
        <ScoreBoard players={game?.players || []} />
        <Flex direction={"column"} maxW={"800px"}>
          <Box mx={3}>
            <Text>Title: {game?.title}</Text>
            <Text>Starts: {formatDate(startDate)}</Text>
            <Text mb={5}>Current Players: {game?.currentPlayerCount}</Text>
          </Box>
          <Divider height={"4px"} backgroundColor={"blue.400"} />
          <Box fontSize={"xl"} textAlign={"center"}>
            Questions
          </Box>
          {game?.questions.map((question: IQuestion) => (
            <Question
              key={question._id}
              question={question}
              game={game}
              user={user}
              setGame={setGame}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
export default GamePage;
