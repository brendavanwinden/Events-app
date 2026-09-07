import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import AddEventForm from "./NewEventForm";
import { useState } from "react";
import { useContext } from "react";
import { EventContext } from "../context/EventsContext";
import { Toaster } from "./ui/toaster";


export const Root = () => {
  const [addEvent, setAddEvent] = useState(false);
  const { categories } = useContext(EventContext);

  return (
    <Box>
      <Navigation openAddEvent={() => setAddEvent(true)} />
      <Outlet />
      <AddEventForm
        event={addEvent}
        categories={categories}
        cancel={() => setAddEvent(false)}
        finish={() => setAddEvent(false)}
      />
      <Toaster />
    </Box>
  );
};
