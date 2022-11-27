import axios from "axios";
import { createContext, useEffect, useState, useTransition } from "react";

import moment from "moment";

export const cp = createContext();

const Context = ({ children }) => {
  // all the events
  const [events, setEvents] = useState([]);

  const [allMatches, setAllMatches] = useState([]);
  const [todaysMatches, setTodaysMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [previousMatches, setPreviousMatches] = useState([]);

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

      // contains todays matches
      const matches = [];

      data.forEach((match, index) => {
        if (match.status === "in_progress") return;
        matches.push(match);
      });
      setTodaysMatches(matches);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUpcomingMatches = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches?by_date=ASC"
      );

      // this will contain all the upcoming matches
      const matches = [];

      if (!data) return;

      data.forEach((match, index) => {
        const days = moment.duration(moment(match.datetime).diff()).asDays();

        // today will not be added to the matches
        if (days > 1) matches.push({ ...match });
      });

      // updating the context
      setUpcomingMatches(matches);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPreviousMatches = async () => {
    try {
      const { data } = await axios.get(
        "https://worldcupjson.net/matches?by_date=ASC"
      );

      // this will contain all the previous matches
      const matches = [];

      if (!data) return;
      data?.forEach((match, index) => {
        const days = moment.duration(moment(match.datetime).diff()).asDays();

        // today is not added to the matches
        if (days < -1) {
          matches.push({ ...match });
        }
      });
      // reversing the previous matches so, that the most recent previous matches gets mapped to the top.
      matches.reverse();
      // updating the context
      setPreviousMatches(matches);
    } catch (error) {
      console.log(error.message);
    }
  };

  // component did mount
  useEffect(() => {
    getAllEvents(); // gets all the matches
    getTodaysEvents(); // gets all the matches that are being held today
    getLiveEvents(); // gets live matches if available
    getUpcomingMatches(); // gets upcoming matches that have a fixed team
    getPreviousMatches(); // gets all the matches that were held before
  }, []);

  return (
    <cp.Provider
      value={{
        events: {
          all: allMatches,
          today: todaysMatches,
          live: liveMatches,
          upNext: upcomingMatches,
          pre: previousMatches,
        },
      }}
    >
      {children}
    </cp.Provider>
  );
};

export default Context;
