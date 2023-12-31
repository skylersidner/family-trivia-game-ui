import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FcPhone, FcDonate, FcEndCall } from "react-icons/fc";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Flex align="center" justify="center">
      <Box maxW={"1280"} margin={"auto"} m={5}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }}
          textAlign={"center"}
          paddingBottom={"40px"}
        >
          How It Works
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcPhone} w={10} h={10} />}
            title={"Create a game"}
            text={
              "Create a trivia game and invite your friends to join."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Create as many games as you want"}
            text={
              "Create as many games as you want and play with as many friends as you want."
            }
          />
          <Feature
            icon={<Icon as={FcEndCall} w={10} h={10} />}
            title={"Real-time updates"}
            text={
              "Creators can update the score in real-time and all players will see the updates."
            }
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
