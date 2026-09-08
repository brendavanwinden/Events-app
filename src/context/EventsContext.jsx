import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getEvents() {
    const response = await fetch("http://localhost:3000/events", {
      method: "GET",
    });
    return response.json();
  }

  async function getCategories() {
    const response = await fetch("http://localhost:3000/categories", {
      method: "GET",
    });
    return response.json();
  }

  async function fetchData() {
    setLoading(true);
    const [eventsResult, categoriesResult] = await Promise.all([
      getEvents(),
      getCategories(),
    ]);
    setEvents(eventsResult);
    setCategories(categoriesResult);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);


 
  return (
    <EventContext.Provider value={{ categories, events, loading }}>
      {children}
    </EventContext.Provider>
  );
}
