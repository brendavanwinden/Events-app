import {
  Heading,
  Image,
  Text,
  Box,
  Checkbox,
  Flex,
  Stack,
  SimpleGrid,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { EventContext } from "../context/EventsContext";
import { SearchBar } from "../components/Search";

export const EventsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const { events, categories } = useContext(EventContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();

  function getCategoryName(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name;
  }

  const normalizedSearch = searchInput.toLowerCase().replace(/[-\s]/g, "");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .replace(/[-\s]/g, "")
      .includes(normalizedSearch);

    const matchesCategory =
      selectedCategories.length === 0 ||
      event.categoryIds.some((id) => selectedCategories.includes(id));

    return matchesSearch && matchesCategory;
  });

  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((current) =>
        current.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories((current) => [...current, categoryId]);
    }
  };

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Heading
          as="h1"
          fontSize={{ base: "50px", md: "60px", lg: "80px" }}
          fontWeight={600}
          textAlign="center"
          mt={{ base: "70px", md: "90px" }}
          mb="50px"
        >
          List of events
        </Heading>

        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

        <HStack gap={4} marginBottom="20px">
          {categories.map((category) => (
            <Checkbox.Root
              key={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => handleCategoryToggle(category.id)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>{category.name}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </HStack>

        {filteredEvents.length === 0 ? (
          <Text fontSize="18px" color="white" marginTop="20px">
            No events found. Try a different search.
          </Text>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} gap={6} mb="60px">
            {filteredEvents.map((event) => {
              const categoryNames = event.categoryIds
                .map((id) => getCategoryName(id))
                .filter(Boolean);

              return (
                <Box
                  key={event.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  mx="auto"
                  maxW="250px"
                  bg="gray.800"
                  borderColor="gray.600"
                  minW="250px"
                  boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <Stack>
                    <Text fontSize="lg" fontWeight="bold">
                      {event.title}
                    </Text>
                    <Text fontSize="sm">{event.description}</Text>
                    <Image
                      src={event.image}
                      alt={event.title}
                      borderRadius="md"
                      mb={3}
                      objectFit="cover"
                      height="150px"
                      width="100%"
                    />
                    <Stack minH="120px" spacing={1}>
                      <Text fontSize="sm" color="gray.400">
                        {event.location}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {new Date(event.startTime).toLocaleString("nl-NL", {
                          day: "numeric",
                          month: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" – "}
                        {new Date(event.endTime).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                      <HStack spacing={2} wrap="wrap">
                        {categoryNames.map((name) => (
                          <Tag.Root
                            key={name}
                            colorScheme="grey"
                            border="1px solid grey"
                          >
                            <Tag.Label fontSize="sm">{name}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Flex>
    </>
  );
};
