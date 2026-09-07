import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = ({ openAddEvent }) => {
  return (
    <nav>
      <Flex gap={2}>
        <Link to="/">Events</Link>
        <Link to="/about">About</Link>
        <Button
          onClick={openAddEvent}
          justifyContent={"space-between"}
          ml="auto"
          mt="10px"
          mr="10px"
          mb="10px"
        >
          Add Event
        </Button>
      </Flex>
    </nav>
  );
};
