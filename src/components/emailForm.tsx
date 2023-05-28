import React, { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  Container,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Input,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { TwilixClient } from "twilixsdk";

const SimpleForm = () => {
  const [text, setText] =
    useState(`James: Hi Bill, on my 21st birthday, I wanted to invite you to my birth party! Can you make it?
---
Bill: `);
  const [apiKey, setApiKey] = useState("");
  const [responseText, setResponseText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("emailCollection");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorText("");
    try {
      // insert the things based on the message
      const client = new TwilixClient(apiKey);
      console.log("client started");
      try {
        await client.deleteCollection(collectionName);
      } catch {
      }
      const bulkInsertResponse = await client.bulkInsert(
        collectionName,
        text.split("---").map((m: string) => {
          return { message: m };
        })
      );
      console.log(bulkInsertResponse);

      // run auto suggest on the collection name
      const response = await client.autoSuggest(
        collectionName, {}
      )
      setResponseText(JSON.stringify(response));
      setLoading(false);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorText(error.message);
      } else {
        console.log(error);
        setErrorText("An error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <Container centerContent>
      <Heading>Auto Suggest Demo</Heading>
      <form onSubmit={handleSubmit}>
        <VStack width="100%" spacing={4}>
          <FormControl id="text">
            <FormLabel>
              API Key (<a href="https://app.twilix.io">Click here to get it</a>){" "}
            </FormLabel>
            <Input
              value={apiKey}
              onChange={(e: any) => setApiKey(e.target.value)}
              type="password"
            ></Input>
            <FormLabel>Email Input</FormLabel>
            <Text>Put a '---'in between each response.</Text>
            <Textarea
              value={text}
              onChange={(e: any) => setText(e.target.value)}
              isRequired
              minHeight="500px"
              maxHeight="500px"
              minWidth="600px"
              maxWidth="800px"
              resize="none"
            />
          </FormControl>
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            type="submit"
            colorScheme="teal"
          >
            Submit
          </Button>
        </VStack>
      </form>
      {(responseText || errorText) && (
        <Box borderWidth={1} borderRadius="md" p={4} mt={4} w="100%">
          <Text fontSize="sm" fontFamily="mono">
            {responseText || errorText}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default SimpleForm;
