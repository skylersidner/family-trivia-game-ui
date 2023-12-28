import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Questions() {
  return (
    <Flex align="center" justify="center" id="contact" flexDirection={"column"}>
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }}
        textAlign={"center"}
        paddingBottom={"40px"}
      >
        I've Got Questions
      </Heading>
      <Box
        bg={"white"}
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
        w={["100%", 600, 800]}
      >
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text color={"blue.400"}>
                    What sort of messages will I be sent?
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color={"blue.400"}>Self Affirmations</Text>
              <Text style={{ marginLeft: "10px" }}>
                I am not defined by my past; I am driven by my future
              </Text>
              <Text style={{ marginLeft: "10px" }}>
                I am grateful for everything I have in my life
              </Text>
              <Text style={{ marginLeft: "10px", marginBottom: "20px" }}>
                I am not pushed by my problems; I am led by my dreams
              </Text>
              <Text color={"blue.400"}>Imposter Syndrome</Text>
              <Text style={{ marginLeft: "10px" }}>
                I deserve to be here just as much as anyone else.
              </Text>
              <Text style={{ marginLeft: "10px" }}>
                I have unique strengths and experiences that add value to this
                team.
              </Text>
              <Text style={{ marginLeft: "10px" }}>
                I have overcome challenges and accomplished things in the past,
                and I can do it again.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text color={"blue.400"}>
                    When will I receive these affirmations?
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Affirmations are sent out every morning around 9:30 (ish) AM CST
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text color={"blue.400"}>
                    What if I want to stop receiving affirmations?
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Had enough? No problem. You can cancel any time. Reply STOP to the
              text message you receive. Email us at{" "}
              <Text color={"blue.400"}>happiermexyz@gmail.com</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
}
