import axios from "../utils/axios";
interface IEventUpdate {
  player: string;
  action: string;
  gameTime: string;
}

interface IEvent {
  _id: string;
  status: string;
  title: string;
  start: Date;
  updates: IEventUpdate[];
  createdBy: string;
}

interface IEventCreate {
  title: string;
}

export const updateEvent = (gameId: string, eventUpdate: IEventUpdate) => {
  return axios.post(`/api/events/${gameId}/update`, eventUpdate);
};

export const createEvent = (newEvent: IEventCreate) => {
  return axios.post(`/api/events/create`, newEvent);
};

export const getPublicEvents = () => {
  return axios.get(`/public/events`);
};
