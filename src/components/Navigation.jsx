import { Flex, Link, Button } from "@chakra-ui/react";

export const Navigation = ({ openAddEvent }) => {
  return (
    <nav>
      <Flex gap={2}>
        <Link href="/">Events</Link>
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
