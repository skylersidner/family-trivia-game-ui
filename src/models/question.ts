import { IAnswer } from "./answer";

export interface IQuestion {
  _id: string;
  test: string;
  answers: IAnswer[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
