import { Heading, Box, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../context/EventsContext";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories } = useContext(EventContext);
  const event = events.find((e) => e.id === Number(eventId));

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

  return (
    <>
      <Heading>{event.title}</Heading>
    
    {filteredEvents.length === 0 ? (
              <Text fontSize="18px" color="white" marginTop="20px">
                No events found.
              </Text> )}

      <Box>
        <div>
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
          <p>
            {event.categoryIds
              .map((id) => getCategoryName(id))
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </Box>
    </>
  );
};
