import {
  Avatar,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./GameManagePage.css";
import { gamesService } from "../services";
import { useParams } from "react-router-dom";

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
                score: 1,
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
            }
          }
        }
      }
      setPlayerMap(playerMap);
    });
  }, []);

  const [isAddingQuestion, setIsAddingQuestion] = useState<any>(false);
  const [questionText, setQuestionText] = useState<string>("");
  const [answer1Text, setAnswer1Text] = useState<string>("");

  function getCurrentGame(gameId: string) {
    gamesService.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }

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
    gamesService.addQuestions({ gameId, questions: [question] }).then(() => {
      getCurrentGame(gameId || "");
    });
    setIsAddingQuestion(false);
    setQuestionText("");
    setAnswer1Text("");
  }

  return (
    <Flex direction={"column"} flex={1}>
      Current Score
      {Object.keys(playerMap).map((playerId) => {
        const player = playerMap[playerId];
        return (
          <Text key={player._id}>
            {player.fullName}: {playerMap[playerId].score}
          </Text>
        );
      })}
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
