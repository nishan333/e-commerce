import { View, Text, Image } from "react-native";
import React from "react";

// styles
import styles from "../styles/Match.js";

const Match = ({ data }) => {
  if (
    data.away_team.name === "To Be Determined" ||
    data.home_team.name === "To Be Determined"
  )
    return <></>;

  return (
    <View style={styles.container}>
      <View style={[styles.country, styles.countryOne]}>
        <Image
          style={styles.flag}
          source={{
            uri: `https://countryflagsapi.com/png/${
              data.home_team.name == "Korea Republic"
                ? data.home_team.country
                : data.home_team.name
            }`,
          }}
        />
        <Text style={styles.countryName}>{data.home_team.name}</Text>
      </View>

      <View style={styles.statContainer}>
        <Text>{data.status}</Text>
        <Text>
          {data.datetime
            ? new Date(data.datetime).toLocaleString()
            : data.datetime}
        </Text>
      </View>

      <View style={[styles.country, styles.countryTwo]}>
        <Image
          style={styles.flag}
          source={{
            uri: `https://countryflagsapi.com/png/${data.away_team.name}`,
          }}
        />
        <Text style={styles.countryName}>{data.away_team.name}</Text>
      </View>
    </View>
  );
};

export default Match;
