import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";

// styles
import styles from "../styles/components/UpdatePopup.js";

// external
import axios from "axios";

// context
import { cp } from "../../Context.js";

const UpdatesPopup = () => {
  const {
    popup: [showDetails, setShowDetails],
  } = useContext(cp);
  const [fetchData, setFetchData] = useState();

  const fetchMatchData = async () => {
    try {
      const { data } = await axios.get(
        `https://worldcupjson.net/matches/${showDetails}`
      );

      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const closePopup = () => {
    setShowDetails(false);
  };
  useEffect(() => {
    fetchMatchData();
  }, [showDetails]);

  return (
    <>
      <Pressable style={styles.blackScreen} onPress={closePopup}></Pressable>

      <View style={styles.whitePopUp}>
        {/* navigation */}
        {/* cards */}

        {
          fetchData.length> 0 ? fetchData.map((event, index)=>{
            return <Event data={event} key= {index} />
          }) 
        }
      </View>
    </>
  );
};

export default UpdatesPopup;
