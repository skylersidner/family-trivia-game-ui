import { Avatar, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import "./GameManagePage.css";
import Games from "../api/games";
import { useAuth } from "../components/AuthContext";
import { useParams } from "react-router-dom";

const GameManagePage = () => {
  const [playerMap, setPlayerMap] = useState<any>({});
  const { gameId } = useParams();
  useEffect(() => {
    if (!gameId) return;
    Games.getGameById({ gameId }).then(({ data }) => {
      let answers = data?.questions?.map((question: any) => {
        return question.answers;
      });
      answers = answers.flat();
      const playerMap: Record<any, any> = {};
      for (const answer of answers) {
        if (answer.isCorrect) {
          for (const player of answer.selectedBy || []) {
            if (!playerMap[player.fullName]) {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: 1,
                fullName: player.fullName,
              };
            } else {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: (playerMap[player._id].score += 1),
                fullName: player.fullName,
              };
            }
          }
        } else {
          for (const player of answer?.selectedBy || []) {
            if (!playerMap[player._id]) {
              playerMap[player._id] = {
                ...playerMap[player._id],
                score: 0,
                fullName: player.fullName,
              };
            }
          }
        }
      }
      setPlayerMap(playerMap);
    });
  }, []);
  return (
    <Flex direction={"column"} flex={1}>
      Current Score
      <Divider height={"4px"} backgroundColor={"blue.400"} />
      {Object.keys(playerMap).map((playerId) => {
        const player = playerMap[playerId];
        return (
          <Text key={player._id}>
            {player.fullName}: {playerMap[playerId].score}
          </Text>
        );
      })}
    </Flex>
  );
};
export default GameManagePage;
