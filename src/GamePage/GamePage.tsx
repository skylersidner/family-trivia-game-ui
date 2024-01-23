import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { gamesService } from "../services";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dates";
import { useAuth } from "../components/AuthContext";
import { CheckIcon } from "@chakra-ui/icons";
import { FaExclamation, FaQuestion } from "react-icons/fa";

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
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [currentAnswerId, setCurrentAnswerId] = useState<any>(null);
  useEffect(() => {
    const currentAnswer = question?.answers.find((answer: any) =>
      answer.selectedBy?.map((user: any) => user._id).includes(user._id)
    );
    if (!currentAnswer) return;
    setSelectedAnswerId(currentAnswer?._id);
    setAnswerSubmitted(true);
    setCurrentAnswerId(currentAnswer?._id);
  }, [question]);
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
            <Checkbox isChecked={selectedAnswerId === answer._id}>
              <Flex alignItems={"center"}>
                {answer.isCorrect && (
                  <CheckIcon marginRight={2} color={"green.700"} />
                )}
                {answer.text}
                {currentAnswerId === answer._id && (
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
          disabled={!selectedAnswerId}
          maxW={"400px"}
          textAlign={"center"}
          onClick={() => {
            gamesService
              .submitAnswer({
                questionId: question._id,
                gameId: game._id,
                answerId: selectedAnswerId,
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
    gamesService.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [isAddingQuestion, setIsAddingQuestion] = useState<any>(false);
  const [questionText, setQuestionText] = useState<string>("");
  const [answer1Text, setAnswer1Text] = useState<string>("");

  if (!game) return null;

  function addQuestion(): void {
    const question = {
      text: questionText,
      answers: [
        {
          text: answer1Text,
          isCorrect: true,
        },
      ],
    };
    console.log(question);
    setIsAddingQuestion(false);
    // TODO; call AddQuestions...
    setQuestionText("");
    setAnswer1Text("");
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
          {game?.questions.map((question: any) => (
            <Question
              key={question.id}
              question={question}
              game={game}
              user={user}
              setGame={setGame}
            />
          ))}
        </Flex>
      </Flex>
      <Flex>
        {!isAddingQuestion && (
          <Button
            ml={2}
            onClick={(event) => {
              event.stopPropagation();
              setIsAddingQuestion(true);
            }}
          >
            Add Question
          </Button>
        )}

        {isAddingQuestion && (
          <VStack spacing={5} bg={"white"} p={10} borderRadius="lg">
            <FormControl isRequired>
              <FormLabel>Question Text</FormLabel>
              <InputGroup>
                <Textarea
                  value={questionText}
                  name="question-text"
                  resize="vertical"
                  id={"add-question-form-text"}
                  placeholder="What is your favorite color?"
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Answer 1</FormLabel>
              <InputGroup>
                <Textarea
                  value={answer1Text}
                  name="answer1-text"
                  resize="vertical"
                  id={"add-question-form-answer-1-text"}
                  placeholder="Yellow... no green!  Aaaaaah...!"
                  onChange={(e) => setAnswer1Text(e.target.value)}
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
              isLoading={false}
              disabled={false}
              onClick={(event) => addQuestion()}
            >
              Add Question
            </Button>
          </VStack>
        )}
      </Flex>
    </>
  );
};
export default GamePage;
