import { Container, VStack, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import CryptoPriceGraph from "../components/CryptoPriceGraph";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg={bgColor} color={color}>
      <VStack spacing={4} width="100%">
        <Button onClick={toggleColorMode} alignSelf="flex-end">
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <CryptoPriceGraph />
      </VStack>
    </Container>
  );
};

export default Index;