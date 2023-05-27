import React, { useState } from 'react';
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
  Heading
} from '@chakra-ui/react';
import axios from 'axios';

const SimpleForm = () => {
  const [text, setText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [responseText, setResponseText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const collection_name = 'your_collection_name';

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorText('');
    try {
      const response = await axios.post(
        `https://api.twilix.io/collection/${collection_name}/auto_suggest`,
        { text }, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }
      );
      setResponseText(JSON.stringify(response.data, null, 2));
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred.")
      }
      setLoading(false);
    }
  };

  return (
    <Container centerContent>
      <Heading>
        Email Demo
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack width="100%" spacing={4}>
          <FormControl id="text">
            <FormLabel>API Key:</FormLabel>
            <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
            >
            </Input>
            <FormLabel>Email Input</FormLabel>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              isRequired
              minHeight="100px"
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