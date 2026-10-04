import { Flex, Button, HStack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export const Navigation = ({ openAddEvent }) => {
  let navigate = useNavigate();
  return (
    <nav>
      <Flex
        as="nav"
        justifyContent="space-between"
        alignItems="center"
        px="6"
        py="4"
        background={"brand.accent"}
        border=" 1px solid"
        borderColor={"brand.accent"}
        color="brand.text"
        borderWidth="1px"
        borderRadius="lg"
      >
        <HStack gap={6}>
          <Button
            color="brand.text"
            bg="brand.bg"
            onClick={() => navigate("/")}
          >
            Events
          </Button>
          <Button
            color="brand.text"
            bg="brand.bg"
            onClick={() => navigate("/about")}
          >
            About
          </Button>
        </HStack>
        <Button color="brand.text" bg="brand.bg" onClick={openAddEvent}>
          Add Event
        </Button>
      </Flex>
    </nav>
  );
};
