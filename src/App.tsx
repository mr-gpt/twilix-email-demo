import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
} from "@chakra-ui/react"
import Emailform from "./components/emailForm"

export const App = () => (
  <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="100vh"
        alignItems="center"
      >
      <VStack spacing={4}>
          <Emailform/>
      </VStack>
    </Box>    
  </ChakraProvider>
)
