import { Heading, Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventsContext";
import EditEventForm from "../components/EditEventForm";
import DeleteEvent from "../components/DeleteEvent";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories } = useContext(EventContext);
  const event = events.find((e) => e.id === Number(eventId));
  const [editEvent, setEditEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);

  function getCategoryName(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name;
  }

  return (
    <>
      {event ? (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading >{event.title}</Heading>
            <Flex>
              <Button
                onClick={() => setEditEvent(true)}
                mt="10px"
                mr="10px"
                mb="10px"
              >
                Edit event
              </Button>
              <EditEventForm
                isOpen={editEvent}
                eventData={event}
                categories={categories}
                cancel={() => setEditEvent(false)}
                finish={() => setEditEvent(false)}
              />
            </Flex>
            <Flex>
              <Button
                onClick={() => setDeleteEvent(true)}
                mt="10px"
                mr="10px"
                mb="10px"
              >
                Delete event
              </Button>
              <DeleteEvent
                isOpen={deleteEvent}
                event={event}
                cancel={() => setDeleteEvent(false)}
                finish={() => setDeleteEvent(false)}
              />
            </Flex>
          </Flex>
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
          </Box>{" "}
        </>
      ) : (
        <Text fontSize="18px" color="white" marginTop="20px">
          Loading....
        </Text>
      )}
    </>
  );
};
