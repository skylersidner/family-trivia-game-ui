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
  return axios.post(`/api/games/${gameId}/update`, eventUpdate);
};

export const createGame = (newEvent: IGameCreate) => {
  return axios.post(`/api/games/create`, newEvent);
};

export const getPublicGames = () => {
  return axios.get(`/public/games`);
};
