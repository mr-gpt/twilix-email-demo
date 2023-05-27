import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import Emailform from "./components/emailForm";
import ExtractPlayground from "./components/extractPlayground"

export const App = () => {
  let [playground, setPlayground] = React.useState("auto-suggest");
  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        // justifyContent="center"
        minHeight="100vh"
        alignItems="center"
      >
        <VStack spacing={4}>
          <Stack spacing={4} direction="row" align="center" marginTop={8}>
            <Button colorScheme="teal" size="xs" onClick={(event: any) => setPlayground("auto-suggest")}
           >
              Auto-Suggest Playground
            </Button>
            <Button colorScheme="teal" size="xs" onClick={(event: any) => setPlayground("extract")}>
              Extract Playground
            </Button>
          </Stack>
          {
            playground == "auto-suggest" &&
            <Emailform />
          }
          {
            playground == "extract" &&
            <ExtractPlayground/>
          }
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
