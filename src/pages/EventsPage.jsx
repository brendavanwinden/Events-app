import {
  Heading,
  Image,
  Input,
  Text,
  Box,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { EventContext } from "../context/EventsContext";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const { categories } = useContext(EventContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const navigate = useNavigate();

  async function getEvents() {
    const response = await fetch("http://localhost:3000/events", {
      method: "GET",
    });
    return response.json();
  }

  useEffect(() => {
    async function fetchEvents() {
      const result = await getEvents();
      setEvents(result);
    }

    fetchEvents();
  }, []);

  function getCategoryName(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name;
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .replace(/[-\s]/g, "")
      .includes(searchInput.toLowerCase().replace(/[-\s]/g, ""));

    const matchesCategory =
      selectedCategories.length === 0 ||
      event.categoryIds.some((id) => selectedCategories.includes(id));

    return matchesSearch && matchesCategory;
  });

  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
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

        <Input
          type="search"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search for your Event"
          _placeholder={{ textAlign: "center" }}
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          border="1px solid white"
          borderRadius="4px"
          padding="8px"
          width="40vw"
          marginBottom="40px"
          textAlign="center"
          fontWeight={500}
          mt={{ base: "70px", md: "90px" }}
          mb="50px"
        />

        <Box marginBottom="20px">
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
          ;
        </Box>

        {filteredEvents.length === 0 ? (
          <Text fontSize="18px" color="white" marginTop="20px">
            No events found. Try a different search.
          </Text>
        ) : (
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {filteredEvents.map((event) => {
              const categoryNames = event.categoryIds
                .map((id) => getCategoryName(id))
                .filter(Boolean);

              return (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <p>{event.title}</p>
                  <p>{event.description}</p>
                  <Image src={event.image} alt={event.title} />
                  <p>{event.location}</p>
                  <p>
                    {new Date(event.startTime).toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    {new Date(event.endTime).toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>{categoryNames.join(", ")}</p>
                </div>
              );
            })}
          </Box>
        )}
      </Flex>
    </>
  );
};
