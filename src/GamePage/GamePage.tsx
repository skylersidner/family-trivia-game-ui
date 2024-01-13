import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import Games from "../api/games";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dates";
import { useAuth } from "../components/AuthContext";

const ScoreBoard = ({ players }: { players: any[] }) => {
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      borderBottom={"3px solid"}
      borderBottomColor={"blue.400"}
      p={3}
    >
      {players.map((player) => {
        return <Avatar name={player.name} />;
      })}
    </Flex>
  );
};

const Question = ({
  question,
  game,
  user,
  setGame,
}: {
  question: any;
  game: any;
  user: any;
  setGame: any;
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [currentAnswerId, setCurrentAnswerId] = useState<any>(null);
  useEffect(() => {
    const currentAnswer = question?.answers.find((answer: any) =>
      answer.selectedBy?.map((user: any) => user._id).includes(user._id)
    );
    if (!currentAnswer) return;
    setSelectedAnswerId(currentAnswer?._id);
    setAnswerSubmitted(true);
    setCurrentAnswerId(currentAnswer?._id);
  }, [question]);
  return (
    <Flex mb={10} mx={3} flexDirection={"column"}>
      <Text>{question.text}</Text>
      {question?.answers.map((answer: any, index: number) => {
        return (
          <Flex
            key={answer._id}
            onClick={() => setSelectedAnswerId(answer._id)}
            cursor={"pointer"}
          >
            <Checkbox isChecked={selectedAnswerId === answer._id}>
              <Box>
                {answer.text}
                {currentAnswerId === answer._id && (
                  <Text color={"blue.400"} display={"inline"}>
                    - submitted
                  </Text>
                )}
              </Box>
            </Checkbox>
          </Flex>
        );
      })}
      <Button
        alignSelf={"center"}
        width={"100%"}
        disabled={!selectedAnswerId}
        maxW={"400px"}
        textAlign={"center"}
        onClick={() => {
          Games.submitAnswer({
            questionId: question._id,
            gameId: game._id,
            answerId: selectedAnswerId,
          }).then(({ data }) => {
            setGame(data);
          });
        }}
      >
        {answerSubmitted ? "Update Answer" : "Submit Answer"}
      </Button>
    </Flex>
  );
};
const GamePage = () => {
  const { user } = useAuth();
  const [game, setGame] = useState<any>(null);
  const { gameId } = useParams();
  useEffect(() => {
    if (!gameId) return;
    Games.getGameById({ gameId }).then(({ data }) => {
      setGame(data);
    });
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  if (!game) return null;
  const startDate = new Date(game?.startDate);
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <ScoreBoard players={game?.players || []} />
      <Flex direction={"column"} maxW={"800px"}>
        <Box mx={3}>
          <Text>Title: {game?.title}</Text>
          <Text>Starts: {formatDate(startDate)}</Text>
          <Text mb={5}>Current Players: {game?.currentPlayerCount}</Text>
        </Box>
        <Divider height={"4px"} backgroundColor={"blue.400"} />
        <Box fontSize={"xl"} textAlign={"center"}>
          Questions
        </Box>
        {game?.questions.map((question: any) => (
          <Question
            key={question.id}
            question={question}
            game={game}
            user={user}
            setGame={setGame}
          />
        ))}
      </Flex>
    </Flex>
  );
};
export default GamePage;
