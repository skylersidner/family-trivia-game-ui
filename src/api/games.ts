import axios from "../utils/axios";

interface IGameCreate {
  title: string;
}

export const updateGame = (gameId: string, update: Record<any, any>) => {
  return axios.patch(`/api/games/${gameId}`, update);
};

export const createGame = (newEvent: IGameCreate) => {
  return axios.post(`/api/games/create`, newEvent);
};

export const getGameById = ({ gameId }: { gameId: string }) => {
  return axios.get(`/api/games/${gameId}`);
};

export const getPublicGames = () => {
  return axios.get(`/public/games`);
};

export const submitAnswer = ({
  gameId,
  questionId,
  answerId,
}: {
  gameId: string;
  questionId: string;
  answerId: string;
}) => {
  return axios.post(`/api/games/${gameId}/question/${questionId}/answer`, {
    answerId,
  });
};

export default {
  updateGame,
  createGame,
  getGameById,
  getPublicGames,
  submitAnswer,
};
