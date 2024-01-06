import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./GameListPage.css";
import { getPublicGames, createGame } from "../api/games";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { baseURL } from "../utils/axios";
const socket = io(baseURL);

const GameListPage = () => {
  const [events, setEvents] = useState<any>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getPublicGames().then(({ data }) => {
      setEvents(data);
    });
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("join-game", "test");
  }, []);
  return (
    <Flex
      direction={"column"}
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      p={3}
    >
      <Button onClick={()=> socket.emit("join-game", "levi")}>Join Game</Button>
      {!events.length && (
        <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
          No events found
        </Flex>
      )}
      <Input
        placeholder={"Search"}
        mb={3}
        value={search}
        bg={"white"}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Flex mb={3}>
        <Button
          disabled={!eventTitle}
          px={8}
          mr={3}
          onClick={() => {
            createGame({
              title: eventTitle,
            }).then(({ data }) => {
              setEvents([...events, data]);
            });
          }}
        >
          Create Event
        </Button>
        <Input
          placeholder={"Title"}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </Flex>
      {events
        .filter((event: any) => !search || event.title.toLowerCase().includes(search?.toLowerCase()))
        .map((event: any) => {
          return (
            <Flex
              key={event._id}
              maxW={800}
              w={"100%"}
              border={"2px solid #E2E8F0"}
              borderRadius={5}
              alignItems={"center"}
              p={3}
              mb={3}
              backgroundColor={"white"}
            >
              <Flex flex={1} alignItems={"center"}>
                <Flex direction={"column"} ml={2}>
                  <Flex>{event.title}</Flex>
                  <Flex>{event.createdBy?.fullName}</Flex>
                </Flex>
              </Flex>
              <Flex>
                <Button onClick={() => navigate(`/game/${event._id}`)}>
                  View
                </Button>
                <Button
                  ml={2}
                  onClick={() => navigate(`/game/manage/${event._id}`)}
                >
                  Manage
                </Button>
              </Flex>
            </Flex>
          );
        })}
    </Flex>
  );
};
export default GameListPage;
