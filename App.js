import React, { useState } from "react";

// Screens
import Home from "./src/screens/Home.js";
import Events from "./src/screens/Events.js";
import Context from "./Context.js";

// external libraries
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState("Home");

  // creating the navigation stack
  const Stack = createNativeStackNavigator();

  // -----------------------------------------------------------
  //------------------------------------------------------------
  // using the custom fonts

  const [loaded] = useFonts({
    "poppins-r": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-b": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-eb": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-l": require("./assets/fonts/Poppins-Light.ttf"),
    "poppins-sb": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-t": require("./assets/fonts/Poppins-Thin.ttf"),
    "poppins-m": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) return;

  return (
    <>
      <Context>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={defaultScreen}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Events"
              component={Events}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Context>
    </>
  );
}
