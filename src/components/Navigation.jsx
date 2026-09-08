import { Flex, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = ({ openAddEvent }) => {
  return (
    <nav>
      <Flex
        as="nav"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.800"
        px="6"
        py="4"
        borderColor="gray.600"
        borderWidth="1px"
        borderRadius="lg"
      >
        <HStack gap={6}>
          <Link to="/">Events</Link>
          <Link to="/about">About</Link>
        </HStack>
        <Button onClick={openAddEvent}>Add Event</Button>
      </Flex>
    </nav>
  );
};
