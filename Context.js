import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cp = createContext();

const Context = ({ children }) => {
  // all the events
  const [events, setEvents] = useState([]);

  //   gets all the events data from the api
  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches?by_date=asc"
      );
      setEvents(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // component did mount
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <cp.Provider
      value={{
        matchesInfo: events,
      }}
    >
      {children}
    </cp.Provider>
  );
};

export default Context;
