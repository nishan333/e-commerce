import { View, Text } from "react-native";
import React from "react";

// components
import Navigation from "../components/Navigation.js";
import SearchBox from "../components/SearchBox.js";
import NoSearch from "../components/NoSearch.js";

const ShowAll = ({ navigation }) => {
  return (
    <>
      <SearchBox />
      <NoSearch />
      <Navigation active="Matches" />
    </>
  );
};

export default ShowAll;
