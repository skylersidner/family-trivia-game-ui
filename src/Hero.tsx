import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.100",
                zIndex: -1,
              }}
            >
              Emerald,
            </Text>
            <br />
            <Text
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
              as={"span"}
              color={"blue.400"}
            >
              sports updates on demand.
            </Text>
          </Heading>
          <Text fontSize={20} color={"gray.500"}>
            Emerald is a sports news app that allows you to get the latest news on your favorite teams and players.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              onClick={() => {
                const contactFormName =
                  document.getElementById("contact-form-name");
                const contactForm = document.getElementById("contact-form");
                if (contactForm && contactFormName) {
                  contactForm.scrollIntoView();
                  contactFormName.focus();
                }
              }}
            >
              Get started
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
