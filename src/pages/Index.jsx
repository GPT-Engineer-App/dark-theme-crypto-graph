import { Container, Text, VStack, Box, useColorMode, Button } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import CryptoPriceGraph from "../components/CryptoPriceGraph";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box display="flex" justifyContent="space-between" width="100%" p={4}>
          <Text fontSize="2xl">Crypto Price Graph</Text>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Box>
        <CryptoPriceGraph />
      </VStack>
    </Container>
  );
};

export default Index;