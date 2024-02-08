import { IAnswer } from "./answer";
import { IUser } from "./users";

export interface IQuestion {
  _id?: string;
  test: string;
  answers: IAnswer[];
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  type?: ANSWER_TYPE;
  winners?: IUser[];
}

export enum ANSWER_TYPE {
  SELECT_ONE = "SELECT_ONE",
  SELECT_MANY = "SELECT_MANY",
  FREE_FORM = "FREE_FORM",
}
