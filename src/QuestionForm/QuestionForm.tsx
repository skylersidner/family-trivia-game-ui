import React, { useState } from "react";
import { ANSWER_TYPE, IQuestion } from "../models/question";
import { gamesService } from "../services";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { snakeCaseToSentenceCase } from "../utils/enumHelpers";
import { IAnswer } from "../models/answer";

const QuestionForm = ({
  question,
  gameId,
  getGame,
}: {
  question: IQuestion;
  gameId: string;
  getGame: any;
}) => {
  // TODO: Fix the answer type selection; it's not updating correctly in the view...
  function getParsedAnswerType(answerTypeString: string) {
    return ANSWER_TYPE[answerTypeString as keyof typeof ANSWER_TYPE];
  }

  function saveQuestion(): void {
    // TODO: make sure this works...
    console.log(question);

    if (question._id) {
      gamesService
        .updateQuestion({ gameId, questionId: question._id, question })
        .then(() => {
          // TODO: invoke param function to refetch question (or game)
        });
    } else {
      gamesService.addQuestions({ gameId, questions: [question] }).then(() => {
        // getCurrentGame(gameId || "");
        // TODO: invoke param function to refetch question (or game)
      });
    }
  }

  function addAnswer(): void {
    question.answers = [...question.answers, { text: "", isCorrect: false }];
  }

  function removeAnswer(index: number): void {
    const filteredAnswers = structuredClone(question.answers).filter(
      (answer: any, idx: number) => {
        return idx != index;
      }
    );
    question.answers = filteredAnswers;
  }

  function setAddedAnswerText(text: string, index: number): void {
    const updatedAnswers = (answers: any) => {
      const newAnswers = structuredClone(answers);
      newAnswers[index].text = text;
      return newAnswers;
    };
    question.answers = updatedAnswers(question.answers);
  }

  return (
    <VStack spacing={5} bg={"white"} p={10} borderRadius="lg">
      <FormControl isRequired>
        <FormLabel>Question Text</FormLabel>
        <InputGroup>
          <Textarea
            value={question.text}
            name="question-text"
            resize="vertical"
            id={"add-question-form-text"}
            placeholder="What is your favorite color?"
            onChange={(e) => (question.text = e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Answer Type</FormLabel>
        <InputGroup>
          <RadioGroup
            onChange={(type) => (question.type = getParsedAnswerType(type))}
            value={question.type}
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
      {question.answers.map((answer: IAnswer, idx: number) => (
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
        onClick={(event) => saveQuestion()}
      >
        {question._id ? "Update" : "Create"} Question
      </Button>
    </VStack>
  );
};

export default QuestionForm;
