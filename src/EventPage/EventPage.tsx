import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import classNames from "classnames";
import "./EventPage.css";
import { io } from "socket.io-client";
import { baseURL } from "../utils/axios";
const socket = io(baseURL);

const ScoreBoard = () => {
  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      borderBottom={"3px solid #4299e1"}
      p={3}
    >
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={20} fontWeight={"500"}>
          Home
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          20
        </Text>
      </Flex>
      <Flex direction={"column"} alignItems={"center"} mx={3}>
        <Text fontSize={20} fontWeight={"500"}>
          Time
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          12:00
        </Text>
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={20} fontWeight={"500"}>
          Away
        </Text>
        <Text fontSize={20} fontWeight={"500"}>
          0
        </Text>
      </Flex>
    </Flex>
  );
};
const EventPage = () => {
  const [updates, setUpdates] = useState<
    {
      name: string;
      action: string;
      score: number[];
      time: string;
      team: string;
    }[]
  >([
    {
      name: "Levi Liester",
      action: "made a 3 pointer",
      score: [3, 0],
      time: "12:00",
      team: "H",
    },
    {
      name: "Patrick Manes",
      action: "made a 2 pointer",
      score: [5, 0],
      time: "11:00",
      team: "H",
    },
    {
      name: "Erik Dodge",
      action: "made a free throw",
      score: [6, 0],
      time: "10:00",
      team: "H",
    },
    {
      name: "Damian Paulson",
      action: "made a 2 pointer",
      score: [8, 0],
      time: "9:12",
      team: "H",
    },
    {
      name: "Steven Renald",
      action: "made a 3 pointer",
      score: [11, 0],
      time: "8:43",
      team: "H",
    },
    {
      name: "Levi Liester",
      action: "steals the ball",
      score: [11, 0],
      time: "7:14",
      team: "H",
    },
    {
      name: "Patrick Manes",
      action: "made a 2 pointer",
      score: [13, 0],
      time: "6:41",
      team: "H",
    },
    {
      name: "Erik Dodge",
      action: "blocks the shot",
      score: [13, 0],
      time: "5:54",
      team: "H",
    },
    {
      name: "Damian Paulson",
      action: "made a 2 pointer",
      score: [15, 0],
      time: "4:51",
      team: "H",
    },
    {
      name: "Steven Renald",
      action: "made a 3 pointer",
      score: [18, 0],
      time: "3:25",
      team: "H",
    },
    {
      name: "Levi Liester",
      action: "steals the ball",
      score: [18, 0],
      time: "2:19",
      team: "H",
    },
    {
      name: "Patrick Manes",
      action: "made a 2 pointer",
      score: [20, 0],
      time: "1:12",
      team: "H",
    },
    {
      name: "Erik Dodge",
      action: "blocks the shot",
      score: [20, 0],
      time: "0:00",
      team: "H",
    },
  ]);

  return (
    <Flex direction={"column"} flex={1} height={"100%"}>
      <ScoreBoard />
      <Flex direction={"column"} overflow={"scroll"}>
        {updates.map((update) => (
          <Flex
            className={"update-container"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottom={"3px solid #E2E8F0"}
            flex={1}
          >
            <Flex alignItems={"center"} w={"100%"}>
              <Text fontSize={18} ml={3} className={"update-time"}>
                {update.time}
              </Text>
              <Avatar name={update.team} mr={3} size={"sm"} />
              <Flex direction={"column"} className={"name-action"} flex={1}>
                <Text fontSize={20} fontWeight={"500"}>
                  {update.name}
                </Text>
                <Text>{update.action}</Text>
              </Flex>
              <Box>
                <Text
                  w={10}
                  fontSize={20}
                  textAlign={"center"}
                >{`${update.score[0]}`}</Text>
              </Box>
              <Box>
                <Text
                  w={10}
                  fontSize={20}
                  textAlign={"center"}
                >{`${update.score[1]}`}</Text>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
export default EventPage;
