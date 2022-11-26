import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  flag: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 15,
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    marginLeft: 10,
    backgroundColor: "#e8e8e8",
    padding: 50,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 3,
    borderRadius: 20,
  },
  countryName: {
    marginTop: 10,
  },
  country: {
    width: 100,
    alignItems: "center",
  },
  statContainer: {
    alignItems: "center",
  },
  score: {
    fontSize: 40,
    color: "#333",
  },
});
