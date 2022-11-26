import { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, Image } from "react-native";
import axios from "axios";

import styles from "../styles/events";

function Events() {
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Events</Text>
      <ScrollView>
        <View style={styles.events}>
          {events.map((event) => (
            <View style={styles.event} key={event.id}>
              <View>
                <Image
                  style={styles.flag}
                  source={{
                    uri: `https://countryflagsapi.com/png/${
                      event.home_team.name == "Korea Republic"
                        ? event.home_team.country
                        : event.home_team.name
                    }`,
                  }}
                />
                <Text>{event.home_team.name}</Text>
              </View>

              <View>
                <Text>{event.status}</Text>
                <Text>
                  {event.datetime
                    ? new Date(event.datetime).toLocaleString()
                    : event.datetime}
                </Text>
              </View>

              <View>
                <Image
                  style={styles.flag}
                  source={{
                    uri: `https://countryflagsapi.com/png/${event.away_team.name}`,
                  }}
                />
                <Text>{event.away_team.name}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Events;
