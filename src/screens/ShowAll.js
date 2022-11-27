import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";

// components
import Navigation from "../components/Navigation.js";
import SearchBox from "../components/SearchBox.js";
import NoSearch from "../components/NoSearch.js";

// context
import { cp } from "../../Context.js";
import Match from "../components/Match.js";

const ShowAll = ({ navigation }) => {
  const {
    search: [query],
    output: [result],
    events: { upNext: upcomingMatches, pre: previousMatches },
  } = useContext(cp);
  return (
    <>
      <SearchBox />

      {!query || query?.length === 0 ? (
        <NoSearch />
      ) : (
        <ScrollView>
          <View
            style={{
              paddingBottom: 100,
              backgroundColor: "#e8e8e8",
            }}
          >
            {query === "previousAll"
              ? previousMatches.map((event, index) => {
                  return <Match data={event} key={event.id} />;
                })
              : query === "upcomingAll"
              ? upcomingMatches.map((event, index) => {
                  return <Match data={event} key={event.id} />;
                })
              : result.map((event) => {
                  return <Match data={event} key={event.id} />;
                })}
          </View>
        </ScrollView>
      )}
      <Navigation active="Matches" />
    </>
  );
};

export default ShowAll;
