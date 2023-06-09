import React, { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  HStack,
  Text,
  Input,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { TwilixClient } from "twilixsdk";

interface ExtractInfo {
  key: string;
  description: string;
}

interface FormValues {
  text: string;
  extract_inputs: ExtractInfo[];
}

const MyForm: React.FC = () => {
  // state for storing form values
  const [formValues, setFormValues] = useState<FormValues>({
    text: 'James was born in Sydney on the 27th of December.',
    extract_inputs: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [apiKey, setApiKey] = useState("");

  // handler for updating text value
  const handleTextChange = (event: any) => {
    setFormValues({
      ...formValues,
      text: event.target.value,
    });
  };

  // handler for adding an extract info object
  const handleAddExtractInfo = () => {
    setFormValues({
      ...formValues,
      extract_inputs: [...formValues.extract_inputs, { key: '', description: '' }],
    });
  };

  // handler for removing an extract info object
  const handleRemoveExtractInfo = (index: number) => {
    const extractInfos = [...formValues.extract_inputs];
    extractInfos.splice(index, 1);
    setFormValues({
      ...formValues,
      extract_inputs: extractInfos,
    });
  };

  // handler for updating extract info values
  const handleExtractInfoChange = (index: number, field: keyof ExtractInfo, value: string) => {
    const extractInfos = [...formValues.extract_inputs];
    extractInfos[index][field] = value;
    setFormValues({
      ...formValues,
      extract_inputs: extractInfos,
    });
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    setErrorText("");
    try {
      const client = new TwilixClient(apiKey);
      console.log("client started");
      console.log('formValues', formValues);
      let response = await client.extract(
        formValues
      );
      console.log(response)
      setResponseText(JSON.stringify(response));

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorText(error.message);
      } else {
        console.log(error);
        setErrorText("An error occurred.");
      }
      setLoading(false);
    }
  }

  return (
    <HStack>
    <Box maxWidth={400} margin={8}>
        <Heading>Extract Playground</Heading>
        <Text>
          API Key (<a href="https://app.twilix.io">Click here to get it</a>){" "}
        </Text>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type="password"
        ></Input>
    <Text>Enter text contents you would like to extract from here:</Text>
      <Textarea placeholder="Enter information here" 
        value={formValues.text} onChange={handleTextChange} width={400}
        height={400}
      />

    </Box>
    <Box maxWidth={400} margin={8}>

      {formValues.extract_inputs.map((extractInfo, index) => (
        <Box key={index} marginTop={8} width={600} marginBottom={8}>
          <Text>The field you to store in the JSON</Text>
          <Input
            placeholder="Key"
            value={extractInfo.key}
            onChange={(event: any) => handleExtractInfoChange(index, 'key', event.target.value)}
          />
          <Text>A description of what this field is about.</Text>
          <Textarea
            placeholder="Description"
            value={extractInfo.description}
            onChange={(event: any) =>
              handleExtractInfoChange(index, 'description', event.target.value)
            }
            marginTop={2}
          />
        <Button
            onClick={() => handleRemoveExtractInfo(index)}
            aria-label="Remove extract info"
            // position="absolute"
            // right="0"
            top="0"
            variant="ghost"
            colorScheme="red"
          >Delete</Button>
        </Box>
      ))}

      <HStack marginTop={4} marginBottom={16}>
      <Button onClick={handleAddExtractInfo} colorScheme="teal">
        Add Field...
      </Button>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          type="submit"
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </HStack>
      {(responseText || errorText) && (
        <Box borderWidth={1} borderRadius="md" p={4} mt={4} w="100%">
          <Text>Response:</Text>
          <Text fontSize="sm" fontFamily="mono">
            {responseText || errorText}
          </Text>
        </Box>
      )}
    </Box>
    </HStack>
  );
};

export default MyForm;
