import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
  },

  navItem: {
    alignItems: "center",
  },

  txt: {
    fontSize: 12,
    color: "#699BF7",
  },
});
