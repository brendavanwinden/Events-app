import { createContext, useState, useEffect } from "react";


export const EventContext = createContext();

export function EventProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

   async function getCategories() {
    const response = await fetch("http://localhost:3000/categories", {
      method: "GET",
    });
    return response.json();
  }

   useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      setCategories(result);
    }

    fetchCategories();
  }, []);

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

  return (
        <EventContext.Provider value={{ categories, events }}>
            {children}
        </EventContext.Provider>
    );
 
};