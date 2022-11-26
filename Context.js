import axios from "axios";
import { createContext, useEffect, useState, useTransition } from "react";

export const cp = createContext();

const Context = ({ children }) => {
  // all the events
  const [events, setEvents] = useState([]);

  const [allMatches, setAllMatches] = useState([]);
  const [todaysMatches, setTodaysMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  //   gets all the events data from the api
  const getAllEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches?by_date=asc"
      );
      setAllMatches(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLiveEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches/current"
      );
      setLiveMatches(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodaysEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches/today"
      );
      setTodaysMatches(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // component did mount
  useEffect(() => {
    getAllEvents();
    getTodaysEvents();
    getLiveEvents();
  }, []);

  return (
    <cp.Provider
      value={{
        events: {
          all: allMatches,
          today: todaysMatches,
          live: liveMatches,
        },
      }}
    >
      {children}
    </cp.Provider>
  );
};

export default Context;
