import { createContext, useEffect } from "react";

const cp = createContext();

const Context = () => {
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
      Alert.alert("Error", error.message);
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
    ></cp.Provider>
  );
};

export default Context;
