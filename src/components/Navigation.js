import { View, Text, Pressable } from "react-native";
import React from "react";

// importing the logos
import Home from "../../assets/svgs/home.svg";
import HomeB from "../../assets/svgs/homeB.svg";
import Football from "../../assets/svgs/football.svg";
import FootballB from "../../assets/svgs/football.svg";

// styles
import styles from "../styles/Navigation.js";

const Navigation = ({ navigation }) => {
  const active = "Home";
  return (
    <View style={styles.container}>
      <Pressable style={[styles.navItem, styles.home]} onPress={() => {}}>
        {active === "Home" ? (
          <>
            <HomeB />
            <Text style={styles.txt}>Home</Text>
          </>
        ) : (
          <Home />
        )}
      </Pressable>

      <Pressable style={[styles.navItem, styles.matches]} onPress={() => {}}>
        {active === "Football" ? (
          <>
            <FootballB />
            <Text style={styles.txt}>Home</Text>
          </>
        ) : (
          <Football />
        )}
      </Pressable>
    </View>
  );
};

export default Navigation;
