import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Home from "./src/screens/Home.js";
import Events from "./src/screens/Events.js";
import Context from "./Context.js";

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState("Home");

  const Stack = createNativeStackNavigator();

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
