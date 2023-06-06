import { useRouteError } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";


 // It will render if there is an error in the app and will display an error message
 
export const DefaultErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="red.200"
    >
      <Box textAlign="center">
        <Heading as="h2" size="xl" color="red.800" mb={4}>
          Oops, something went wrong!
        </Heading>
        <Text color="red.600" fontSize="lg">
          {error.message}
        </Text>
      </Box>
    </Box>
  );
};
