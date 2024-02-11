import { IUser } from "./users";

export interface IAnswer {
  _id?: string;
  text: string;
  isCorrect: boolean;
  createdBy?: string;
  updatedBy?: string;
  selectedBy?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
  winners?: IUser[];
}
