import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Textarea,
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
        {/* Include your components inside the VStack with appropriate spacing */}
          <Emailform/>
      </VStack>
    </Box>    
  </ChakraProvider>
)
