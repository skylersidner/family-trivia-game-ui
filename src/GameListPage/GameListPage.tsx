import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./GameListPage.css";
import { getPublicGames, createGame } from "../api/games";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { baseURL } from "../utils/axios";
import { useAuth } from "../components/AuthContext";
import formatDate from "../utils/dates";
const socket = io(baseURL);

const GameListPage = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<any>([]);
  const [gameTitle, setGameTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getPublicGames().then(({ data }) => {
      setGames(data);
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
      <Input
        placeholder={"Search"}
        mb={3}
        value={search}
        bg={"white"}
        onChange={(e) => setSearch(e.target.value)}
      />
      {!games.length && (
        <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
          No Games found
        </Flex>
      )}
      <Flex mb={3}>
        <Button
          disabled={!gameTitle}
          px={8}
          mr={3}
          onClick={() => {
            createGame({
              title: gameTitle,
            }).then(({ data }) => {
              setGames([...games, data]);
            });
          }}
        >
          Create Game
        </Button>
        <Input
          placeholder={"Title"}
          onChange={(e) => setGameTitle(e.target.value)}
        />
      </Flex>
      {games
        .filter(
          (games: any) =>
            !search || games.title.toLowerCase().includes(search?.toLowerCase())
        )
        .map((game: any) => {
          return (
            <Flex
              key={game._id}
              maxW={800}
              w={"100%"}
              border={"2px solid #E2E8F0"}
              borderRadius={5}
              alignItems={"center"}
              p={3}
              mb={3}
              backgroundColor={"white"}
              onClick={() => navigate(`/game/${game._id}`)}
              cursor={"pointer"}
              _hover={{ borderColor: "blue.400" }}
              transition={"all 0.2s ease-in-out"}
            >
              <Flex flex={1} alignItems={"center"}>
                <Flex direction={"column"} ml={2} alignSelf={"start"}>
                  <Flex>Title: {game.title}</Flex>
                  <Flex>Created By: {game.createdBy?.fullName}</Flex>
                  <Flex>Created At: {formatDate(game.createdAt)}</Flex>
                  <Flex>Starts At: {formatDate(game.startDate)}</Flex>
                </Flex>
                <Flex direction={"column"} ml={2} alignSelf={"start"}>
                  <Flex>Questions: {game.questions?.length}</Flex>
                  <Flex>Player Count: {game.currentPlayerCount}</Flex>
                </Flex>
              </Flex>
              {game.createdBy._id === user?._id && (
                <Flex>
                  <Button
                    ml={2}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/game/manage/${game._id}`);
                    }}
                  >
                    Manage
                  </Button>
                </Flex>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
};
export default GameListPage;
