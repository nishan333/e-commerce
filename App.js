import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

// Screens
import Home from "./src/screens/Home.js";
import Events from "./src/screens/Events.js";
import Chat from "./src/screens/Chat.js";

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState("Chats");

  const Stack = createNativeStackNavigator();

  return (
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
        <Stack.Screen
          name="Chats"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
