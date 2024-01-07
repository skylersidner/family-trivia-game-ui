import axios from "../utils/axios";
interface IGameUpdate {
  player: string;
  action: string;
  gameTime: string;
}

interface IGame {
  _id: string;
  status: string;
  title: string;
  start: Date;
  updates: IGameUpdate[];
  createdBy: string;
}

interface IGameCreate {
  title: string;
}

export const updateGame = (gameId: string, eventUpdate: IGameUpdate) => {
  return axios.patch(`/api/games/${gameId}`, eventUpdate);
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
