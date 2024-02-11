import axios from "../utils/axios";
import { IQuestion } from "../models/question";

const basePath = "/api/games";

interface IGameCreate {
  title: string;
}

export const updateGame = (gameId: string, update: Record<any, any>) => {
  return axios.patch(`${basePath}/${gameId}`, update);
};

export const createGame = (newEvent: IGameCreate) => {
  return axios.post(`${basePath}/create`, newEvent);
};

export const getGameById = ({ gameId }: { gameId: string }) => {
  return axios.get(`${basePath}/${gameId}`);
};

export const getPublicGames = () => {
  return axios.get(`/public/games`);
};

export const submitAnswer = ({
  gameId,
  questionId,
  answerIds,
}: {
  gameId: string;
  questionId: string;
  answerIds: string[];
}) => {
  return axios.post(`${basePath}/${gameId}/question/${questionId}/answer`, {
    answerIds,
  });
};

const addQuestions = ({
  gameId,
  questions,
}: {
  gameId: any;
  questions: any;
}) => {
  return axios.post(`${basePath}/${gameId}/questions`, {
    questions,
  });
};

export const updateQuestion = ({
  gameId,
  questionId,
  question,
}: {
  gameId: string;
  questionId: string;
  question: any;
}) => {
  return axios.patch(`${basePath}/${gameId}/question/${questionId}`, {
    question,
  });
};

export const updateAnswer = ({
  gameId,
  questionId,
  answerId,
  answer,
}: {
  gameId: string;
  questionId: string;
  answerId: string;
  answer: any;
}) => {
  return axios.patch(
    `${basePath}/${gameId}/question/${questionId}/answer/${answerId}`,
    {
      answer,
    }
  );
};

const deleteQuestion = ({
  gameId,
  questionId,
}: {
  gameId: any;
  questionId: any;
}) => {
  return axios.delete(`${basePath}/${gameId}/question/${questionId}`);
};

const gamesService = {
  updateGame,
  createGame,
  getGameById,
  getPublicGames,
  submitAnswer,
  addQuestions,
  updateQuestion,
  updateAnswer,
  deleteQuestion,
};
export default gamesService;
