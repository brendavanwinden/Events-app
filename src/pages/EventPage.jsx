import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  Flex,
  Stack,
  HStack,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventsContext";
import EditEventForm from "../components/EditEventForm";
import DeleteEvent from "../components/DeleteEvent";
import { EventDetailSkeleton } from "../components/EventSkeleton";
import { useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const { events, categories, loading } = useContext(EventContext);
  const event = events.find((e) => e.id === Number(eventId));
  const [editEvent, setEditEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  let navigate = useNavigate();

  function getCategoryName(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name;
  }

  return (
    <>
      {loading ? (
        <EventDetailSkeleton/>
      ) : (
        <Box
          key={event.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          mx="auto"
          maxW="80vw"
          bg="brand.card"
          borderColor="brand.accent"
          display={"grid"}
          columnCount={"1"}
          justifyContent={"center"}
          textAlign={"center"}
          boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
          mt={"30px"}
          mb={"30px"}
        >
          <Heading mb="20px">{event.title}</Heading>
          <Box>
            <div>
              <Text mb="20px">{event.description}</Text>
              <Image
                src={event.image}
                alt={event.title}
                borderRadius="md"
                border="1px solid"
                borderColor={"brand.accent"}
                mb={3}
                objectFit="cover"
              />
              <Stack minH="120px" spacing={1}>
                <Text fontSize="sm" color="brand.text">
                  {event.location}
                </Text>
                <Text
                  fontSize="sm"
                  color="brand.text"
                  textAlign={"center"}
                  display={"grid"}
                  columnCount={"1"}
                >
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
                <HStack
                  spacing={2}
                  wrap="wrap"
                  justifyContent="center"
                  width="100%"
                >
                  {event.categoryIds
                    .map((id) => getCategoryName(id))
                    .filter(Boolean)
                    .map((name) => (
                      <Tag.Root
                        key={name}
                        background={"brand.accent"}
                        border=" 1px solid"
                        borderColor={"brand.accent"}
                        boxShadow="none"
                      >
                        <Tag.Label fontSize="sm" color="brand.text">
                          {name}
                        </Tag.Label>
                      </Tag.Root>
                    ))}
                </HStack>
              </Stack>
            </div>
          </Box>{" "}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Flex>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                mt="10px"
                mr="10px"
                mb="10px"
                background={"brand.accent"}
                border=" 1px solid"
                borderColor={"brand.accent"}
                color="brand.text"
              >
                Go back
              </Button>
            </Flex>
            <Flex>
              <Button
                onClick={() => setEditEvent(true)}
                mt="10px"
                mr="10px"
                mb="10px"
                background={"brand.accent"}
                border=" 1px solid"
                borderColor={"brand.accent"}
                color="brand.text"
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
                background={"brand.accent"}
                border=" 1px solid"
                borderColor={"brand.accent"}
                color="brand.text"
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
        </Box>
      )}
    </>
  );
};
