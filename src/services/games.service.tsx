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
  answerId,
}: {
  gameId: string;
  questionId: string;
  answerId: string;
}) => {
  return axios.post(`${basePath}/${gameId}/question/${questionId}/answer`, {
    answerId,
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
    questions: superbowlQuestions,
  });
};

const gamesService = {
  updateGame,
  createGame,
  getGameById,
  getPublicGames,
  submitAnswer,
  addQuestions,
};
export default gamesService;

const superbowlQuestions = [
  {
    text: "Will the national anthem be longer than 1 minute 55 seconds?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "Will the first commercial break after the game starts be for a food and/or drink item?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "Team to win the coin toss?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
    ],
  },
  {
    text: "Will the coin toss be heads or tails",
    answers: [
      { text: "Heads", isCorrect: null },
      { text: "Tails", isCorrect: null },
    ],
  },
  {
    text: "First team to score a touchdown in the first half?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "First team to score a field goal in the first half?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "First team to get a penalty in the first half?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "First team to sack the quarterback in the first half?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "Which team will punt first?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "Any successful coach challenges in the first half?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "Will there be an interception in the first half?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "If so, which team will intercept?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Neither",
        isCorrect: null,
      },
    ],
  },
  {
    text: "Will there be a touchdown scored by the defence in the first half?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "Which team will lead the score at halftime?",
    answers: [
      { text: "Lions", isCorrect: null },
      { text: "49ers", isCorrect: null },
      {
        text: "Tied",
        isCorrect: null,
      },
    ],
  },
  {
    text: "What will the spread be at halftime?",
    answers: [
      { text: "0 (Tied)", isCorrect: null },
      {
        text: "1-3 points",
        isCorrect: null,
      },
      { text: "4-7 points", isCorrect: null },
      { text: "8-11 points", isCorrect: null },
      {
        text: "12-14 points",
        isCorrect: null,
      },
      { text: "15-28 points", isCorrect: null },
      { text: "29+ points", isCorrect: null },
    ],
  },
  {
    text: "What songs will be sung at the halftime show? Points taken away for incorrect songs.",
    answers: [
      { text: "OMG", isCorrect: null },
      { text: "Good Good", isCorrect: null },
      {
        text: "Yeah!",
        isCorrect: null,
      },
      { text: "Hey Daddy", isCorrect: null },
      {
        text: "My Boo",
        isCorrect: null,
      },
      { text: "DJ Got Us Fallin' In Love", isCorrect: null },
      {
        text: "Dientes",
        isCorrect: null,
      },
      { text: "U Got It Bad", isCorrect: null },
      {
        text: "I Don't Mind",
        isCorrect: null,
      },
      { text: "Love in This Club", isCorrect: null },
      {
        text: "Love in This Club, Pt. II",
        isCorrect: null,
      },
      { text: "Burn", isCorrect: null },
      { text: "Moving Mountains", isCorrect: null },
      {
        text: "Nice & Slow",
        isCorrect: null,
      },
      { text: "Confessions Part II", isCorrect: null },
      {
        text: "There Goes My Baby",
        isCorrect: null,
      },
      { text: "Trading Places", isCorrect: null },
      { text: "You Remind Me", isCorrect: null },
      {
        text: "Scream",
        isCorrect: null,
      },
      { text: "Climax", isCorrect: null },
      { text: "You Make Me Wanna", isCorrect: null },
      {
        text: "Scream",
        isCorrect: null,
      },
      { text: "U Don't Have to Call", isCorrect: null },
      {
        text: "Lemme See",
        isCorrect: null,
      },
      { text: "Caught Up", isCorrect: null },
    ],
  },
  {
    text: "Will there be a missed extra point in the first half?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
  {
    text: "Will there be more than 3 car commercials in the first half?",
    answers: [
      { text: "Yes", isCorrect: null },
      { text: "No", isCorrect: null },
    ],
  },
];
