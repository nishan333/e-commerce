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
    <ScrollView>
      <View style={styles.container}>
        {/* upper nav */}
        {/* hero section  */}

        {/* events */}
        {events.map((event) => {
          return <Match data={event} key={event.id} />;
        })}

        {/* navigation */}

        <Navigation navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Home;
