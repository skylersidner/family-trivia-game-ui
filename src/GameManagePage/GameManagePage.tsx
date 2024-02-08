import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import "./GameManagePage.css";
import { gamesService } from "../services";
import { useParams } from "react-router-dom";
import { IAnswer } from "../models/answer";
import { CheckIcon } from "@chakra-ui/icons";
import { ANSWER_TYPE, IQuestion } from "../models/question";
import { snakeCaseToSentenceCase } from "../utils/enumHelpers";
import { sample } from "lodash";
import { IUser } from "../models/users";
import { updateQuestion } from "../services/games.service";

const Question = ({
  question,
  gameId,
  setGame,
  isShowingSelectedBy = false,
}: {
  question: any;
  gameId: string;
  setGame: any;
  isShowingSelectedBy: boolean;
}) => {
  const getCurrentWinners = useCallback(() => {
    if (question.type == ANSWER_TYPE.SELECT_ONE) {
      return question.answers?.find((answer: IAnswer) => answer.isCorrect)
        ?.winners;
    }
    return null;
  }, [question]);

  const [winners, setWinners] = useState<IUser[]>(getCurrentWinners());
  const [isChoosingWinners, setIsChoosingWinners] = useState<boolean>(false);
  const [currentRandomWinner, setCurrentRandomWinner] = useState<IUser | null>(
    null
  );

  const hasCorrectSubmissions = useCallback(() => {
    return question.answers?.reduce(
      (hasSubmissions: boolean, answer: IAnswer) => {
        if (answer.isCorrect && !!answer.selectedBy?.length) {
          hasSubmissions = true;
        }
        return hasSubmissions;
      },
      false
    );
  }, [question]);

  function chooseAndSetOneRandomWinner(): void {
    const correctAnswer = question.answers?.find(
      (answer: IAnswer) => answer.isCorrect
    );
    let randomWinner = null;
    if (correctAnswer) {
      const hasOneSelectedBy = correctAnswer.selectedBy.length == 1;
      const hasMoreThanOneSelectedBy = correctAnswer.selectedBy.length > 1;
      if (hasOneSelectedBy) {
        randomWinner = correctAnswer.selectedBy[0];
      } else if (hasMoreThanOneSelectedBy) {
        randomWinner = sample(correctAnswer.selectedBy);
      }
    }

    setCurrentRandomWinner(randomWinner);
  }

  function saveRandomWinner(): void {
    if (currentRandomWinner) {
      gamesService.updateQuestion({
        gameId,
        questionId: question._id,
        question: {
          _id: question._id,
          winners: [currentRandomWinner._id],
        },
      });
    }
    setIsChoosingWinners(false);
  }

  return (
    <Flex mb={10} mx={3} flexDirection={"column"}>
      <Text>{question.text}</Text>
      {question?.answers.map((answer: IAnswer) => {
        return (
          <Flex key={answer._id}>
            <Flex alignItems={"center"}>
              {answer.isCorrect && (
                <CheckIcon marginRight={2} color={"green.700"} />
              )}
              {answer.text}
              {isShowingSelectedBy && !!answer.selectedBy?.length && (
                <Text fontSize="xs" as="i">
                  &nbsp;Selected by:&nbsp;
                  {answer.selectedBy
                    ?.map((player) => player.fullName)
                    .join(", ")}
                </Text>
              )}
            </Flex>
            {!!winners?.length && <Text>Winners: {winners.join(", ")}</Text>}
          </Flex>
        );
      })}
      {hasCorrectSubmissions() && question?.type == ANSWER_TYPE.SELECT_ONE && (
        <Flex>
          <Button
            m={2}
            onClick={(event) => {
              event.stopPropagation();
              chooseAndSetOneRandomWinner();
              setIsChoosingWinners(true);
            }}
          >
            Choose One Random Winner...
          </Button>
          {isChoosingWinners && (
            <Flex>
              <Text>
                Picked:&nbsp;{currentRandomWinner?.fullName || "N/A"}
                <Button
                  m={2}
                  onClick={(event) => {
                    event.stopPropagation();
                    saveRandomWinner();
                  }}
                >
                  Save This Winner
                </Button>
              </Text>
            </Flex>
          )}
        </Flex>
      )}
      <Flex>
        <Button
          m={2}
          onClick={() => {
            gamesService
              .deleteQuestion({
                gameId: gameId,
                questionId: question._id,
              })
              .then(({ data }) => {
                setGame(data);
              });
          }}
        >
          Delete Question
        </Button>
      </Flex>
    </Flex>
  );
};
const GameManagePage = () => {
  const [playerMap, setPlayerMap] = useState<any>({});
  const { gameId } = useParams();
  const [game, setGame] = useState<any>({});
  useEffect(() => {
    if (!gameId) return;
    gamesService.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
      let answers = data?.questions?.map((question: any) => {
        return question.answers;
      });
      answers = answers.flat();
      const playerMap: Record<any, any> = {};
      for (const answer of answers) {
        if (answer.isCorrect) {
          for (const player of answer.selectedBy || []) {
            if (!playerMap[player._id]) {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: answer.points,
                fullName: player.fullName,
              };
            } else {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: (playerMap[player._id].score += 1),
                fullName: player.fullName,
              };
            }
          }
        } else {
          for (const player of answer?.selectedBy || []) {
            if (!playerMap[player._id]) {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: 0,
                fullName: player.fullName,
              };
            } else {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: (playerMap[player._id].score || 0) + answer.points,
                fullName: player.fullName,
              };
            }
          }
        }
      }
      setPlayerMap(playerMap);
    });
  }, []);

  const [isShowingSelectedBy, setIsShowingSelectedby] =
    useState<boolean>(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [answerType, setAnswerType] = useState<ANSWER_TYPE>(
    ANSWER_TYPE.SELECT_ONE
  );
  const [addedAnswers, setAddedAnswers] = useState<any>([]);
  const [questionText, setQuestionText] = useState<string>("");

  function setParsedAnswerType(answerTypeString: string) {
    const parsedAnswerType: ANSWER_TYPE =
      ANSWER_TYPE[answerTypeString as keyof typeof ANSWER_TYPE];
    setAnswerType(parsedAnswerType);
  }

  function getCurrentGame(gameId: string) {
    gamesService.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }

  function addQuestion(): void {
    setAddedAnswers([{ text: "", isCorrect: false }]);
    setIsAddingQuestion(true);
  }

  function createQuestion(): void {
    const question = {
      text: questionText,
      answers: addedAnswers,
      type: answerType,
    };
    console.log(question);
    gamesService.addQuestions({ gameId, questions: [question] }).then(() => {
      getCurrentGame(gameId || "");
    });
    setIsAddingQuestion(false);
    setQuestionText("");
  }

  function addAnswer(): void {
    setAddedAnswers([...addedAnswers, { text: "", isCorrect: false }]);
  }

  function removeAnswer(index: number): void {
    const filteredAnswers = structuredClone(addedAnswers).filter(
      (answer: any, idx: number) => {
        return idx != index;
      }
    );
    setAddedAnswers(filteredAnswers);
  }

  function setAddedAnswerText(text: string, index: number): void {
    setAddedAnswers((addedAnswers: any) => {
      const newAddedAnswers = structuredClone(addedAnswers);
      newAddedAnswers[index].text = text;
      return newAddedAnswers;
    });
  }

  return (
    <Flex direction={"column"} flex={1}>
      Current Score
      {Object.keys(playerMap).map((playerId) => {
        const player = playerMap[playerId];
        return (
          <Text key={playerId}>
            {" "}
            <span>PlayerId: {player._id}</span>
            {player.fullName}: {playerMap[playerId].score}
          </Text>
        );
      })}
      <Box position="relative" padding="4">
        <Divider />
        <AbsoluteCenter px="4">Questions</AbsoluteCenter>
      </Box>
      <Flex direction="column" m={2}>
        {game?.questions?.map((question: any) => {
          return (
            <Question
              key={question._id}
              question={question}
              gameId={gameId!}
              setGame={setGame}
              isShowingSelectedBy={isShowingSelectedBy}
            />
          );
        })}
      </Flex>
      <Box position="relative" padding="4">
        <Divider />
        <AbsoluteCenter px="4">Other Actions</AbsoluteCenter>
      </Box>
      <Flex>
        <Button
          m={2}
          onClick={(event) => {
            event.stopPropagation();
            setIsShowingSelectedby(!isShowingSelectedBy);
          }}
        >
          Toggle Answer Selections
        </Button>
      </Flex>
      <Flex>
        {!isAddingQuestion && (
          <Button
            m={2}
            onClick={(event) => {
              event.stopPropagation();
              addQuestion();
            }}
          >
            Add Another Question
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
            <FormControl>
              <FormLabel>Answer Type</FormLabel>
              <InputGroup>
                <RadioGroup
                  onChange={(type) => setParsedAnswerType(type)}
                  value={answerType}
                >
                  <Stack direction="row" spacing={4}>
                    <Radio value={ANSWER_TYPE.SELECT_ONE}>
                      {snakeCaseToSentenceCase(ANSWER_TYPE.SELECT_ONE)}
                    </Radio>
                    <Radio value={ANSWER_TYPE.SELECT_MANY}>
                      {snakeCaseToSentenceCase(ANSWER_TYPE.SELECT_MANY)}
                    </Radio>
                    <Radio value={ANSWER_TYPE.FREE_FORM}>
                      {snakeCaseToSentenceCase(ANSWER_TYPE.FREE_FORM)}
                    </Radio>
                  </Stack>
                </RadioGroup>
              </InputGroup>
            </FormControl>
            {addedAnswers.map((answer: IAnswer, idx: number) => (
              <FormControl isRequired key={"addedAnswer-" + idx}>
                <FormLabel>Answer {idx + 1}</FormLabel>
                <InputGroup>
                  <Textarea
                    value={answer.text}
                    name={"answer" + (idx + 1) + "-text"}
                    resize="vertical"
                    id={"add-question-form-answer-" + (idx + 1) + "-text"}
                    placeholder={"Answer " + (idx + 1)}
                    onChange={(e) => setAddedAnswerText(e.target.value, idx)}
                  />
                </InputGroup>

                <Button
                  colorScheme="blue"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={false}
                  disabled={false}
                  onClick={(_) => removeAnswer(idx)}
                >
                  Remove Answer
                </Button>
              </FormControl>
            ))}
            <Button
              colorScheme="blue"
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
              isLoading={false}
              disabled={false}
              onClick={(event) => addAnswer()}
            >
              Add Another Answer
            </Button>
            <Button
              colorScheme="blue"
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
              isLoading={false}
              disabled={false}
              onClick={(event) => createQuestion()}
            >
              Create Question
            </Button>
          </VStack>
        )}
      </Flex>
      <Button
        onClick={() =>
          gamesService.updateGame(gameId!, {
            status: "FINISHED",
          })
        }
      >
        Finish Game
      </Button>
    </Flex>
  );
};
export default GameManagePage;
