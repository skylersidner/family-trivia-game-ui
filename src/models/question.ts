import { IAnswer } from "./answer";

export interface IQuestion {
  _id?: string;
  text: string;
  answers: IAnswer[];
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  type?: ANSWER_TYPE;
}

export enum ANSWER_TYPE {
  SELECT_ONE = "SELECT_ONE",
  SELECT_MANY = "SELECT_MANY",
  FREE_FORM = "FREE_FORM",
}
