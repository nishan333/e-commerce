import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";

// styles
import styles from "../styles/components/UpdatePopup.js";
import axios from "axios";
import { cp } from "../../Context.js";

const UpdatesPopup = ({ matchId }) => {
  const {
    popup: [showDetails, setShowDetails],
  } = useContext(cp);

  const fetchMatchData = async () => {
    try {
      await axios.get(`https://worldcupjson.net/matches/${matchId}`);
    } catch (e) {
      console.log(e.message);
    }
  };
  const closePopup = () => {
    setShowDetails(false);
  };
  useEffect(() => {
    fetchMatchData();
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <Pressable style={styles.blackScreen} onPress={closePopup}></Pressable>

        <View style={styles.whitePopUp}>
          {/* navigation */}
          {/* cards */}
        </View>
      </View>
    </>
  );
};

export default UpdatesPopup;
