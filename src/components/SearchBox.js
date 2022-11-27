import { View, Text, TextInput } from "react-native";
import React from "react";

// icon
import SearchIcon from "../../assets/svgs/search.svg";

// styles
import styles from "../styles/components/SearchBox.js";

const SearchBox = () => {
  return (
    <View style={styles.searchCon}>
      <TextInput
        placeholder="Argentina vs Brazil"
        style={styles.txtInput}
        placeholderTextColor={"#686868"}
      />
      <View style={styles.btn}>
        <SearchIcon />
      </View>
    </View>
  );
};

export default SearchBox;
