import { Avatar, Button, Divider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import classNames from "classnames";
import "./GameManagePage.css";

const GameManagePage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>(
    undefined
  );

  return (
    <Flex direction={"column"} flex={1}>
      <Flex flex={1} direction={"column"} justifyContent={"center"}>
        <Flex justifyContent={"space-evenly"} mb={10}>
          <Avatar
            size={"xl"}
            name={"Levi Liester"}
            showBorder={1 === selectedPlayer}
            className={classNames({ selectedPlayer: 1 === selectedPlayer })}
            onClick={() => setSelectedPlayer(1)}
          />
          <Avatar
            size={"xl"}
            name={"Patrick Manes"}
            showBorder={2 === selectedPlayer}
            className={classNames({ selectedPlayer: 2 === selectedPlayer })}
            onClick={() => setSelectedPlayer(2)}
          />
        </Flex>
        <Flex justifyContent={"space-evenly"}>
          <Avatar
            size={"xl"}
            name={"Erik Dodge"}
            showBorder={3 === selectedPlayer}
            className={classNames({ selectedPlayer: 3 === selectedPlayer })}
            onClick={() => setSelectedPlayer(3)}
          />
          <Avatar
            size={"xl"}
            name={"Damian Paulson"}
            showBorder={4 === selectedPlayer}
            className={classNames({ selectedPlayer: 4 === selectedPlayer })}
            onClick={() => setSelectedPlayer(4)}
          />
          <Avatar
            size={"xl"}
            name={"Steven Renald"}
            showBorder={5 === selectedPlayer}
            className={classNames({ selectedPlayer: 5 === selectedPlayer })}
            onClick={() => setSelectedPlayer(5)}
          />
        </Flex>
      </Flex>
      <Divider height={"4px"} backgroundColor={"black"} />
      <Flex flex={1} my={3} direction={"column"} justifyContent={"center"}>
        <Flex flex={1} justifyContent={"space-evenly"} alignItems={"center"}>
          <Button> 2pts</Button>
          <Button> 3pts</Button>
          <Button> Free Throw</Button>
        </Flex>
        <Flex flex={1} justifyContent={"space-evenly"} alignItems={"center"}>
          <Button> Assist</Button>
          <Button> Block</Button>
          <Button> Steal</Button>
        </Flex>
      </Flex>
      <Divider height={"4px"} backgroundColor={"black"} />
      <Flex flex={1} direction={"column"} justifyContent={"center"}>
        <Flex flex={1} direction={"column"} justifyContent={"center"}>
          <Flex justifyContent={"space-evenly"} mb={10}>
            <Avatar
              size={"xl"}
              name={"Allen Price"}
              showBorder={6 === selectedPlayer}
              className={classNames({ selectedPlayer: 6 === selectedPlayer })}
              onClick={() => setSelectedPlayer(6)}
            />
            <Avatar
              size={"xl"}
              name={"Tony Ronald"}
              showBorder={7 === selectedPlayer}
              className={classNames({ selectedPlayer: 7 === selectedPlayer })}
              onClick={() => setSelectedPlayer(7)}
            />
          </Flex>
          <Flex justifyContent={"space-evenly"}>
            <Avatar
              size={"xl"}
              name={"Erin Paige"}
              showBorder={8 === selectedPlayer}
              className={classNames({ selectedPlayer: 8 === selectedPlayer })}
              onClick={() => setSelectedPlayer(8)}
            />
            <Avatar
              size={"xl"}
              name={"Kris Long"}
              showBorder={9 === selectedPlayer}
              className={classNames({ selectedPlayer: 9 === selectedPlayer })}
              onClick={() => setSelectedPlayer(9)}
            />
            <Avatar
              size={"xl"}
              name={"Paul Dredge"}
              showBorder={10 === selectedPlayer}
              className={classNames({ selectedPlayer: 10 === selectedPlayer })}
              onClick={() => setSelectedPlayer(10)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default GameManagePage;
