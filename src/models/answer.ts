export interface IAnswer {
  _id: string;
  text: string;
  isCorrect: boolean;
  createdBy: string;
  updatedBy: string;
  selectedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
