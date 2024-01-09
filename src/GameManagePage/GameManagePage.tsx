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
              playerMap[player.fullName] = 1;
            } else {
              playerMap[player.fullName] += 1;
            }
          }
        } else {
          for (const player of answer?.selectedBy || []) {
            if (!playerMap[player.fullName]) {
              playerMap[player.fullName] = 0;
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
        return (
          <Text>
            {playerId}: {playerMap[playerId]}
          </Text>
        );
      })}
    </Flex>
  );
};
export default GameManagePage;
