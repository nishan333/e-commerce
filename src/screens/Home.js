import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";

// context
import { cp } from "../../Context";

// styles
import styles from "../styles/Home.js";

// components
import Match from "../components/Match.js";
import Navigation from "../components/Navigation.js";

function Home({ navigation }) {
  const { matchesInfo: events } = useContext(cp);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* upper nav */}
          {/* hero section  */}

          {/* events */}
          {events.map((event) => {
            return <Match data={event} key={event.id} />;
          })}
        </ScrollView>

        {/* navigation */}
      </View>
      <Navigation active={"Home"} />
    </>
  );
}

export default Home;
