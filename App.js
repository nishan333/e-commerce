import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

// Screens
import Auth from "./screens/Auth";
import Home from "./screens/Home";

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState("Auth");

  const Stack = createNativeStackNavigator();

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      setDefaultScreen("Home");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultScreen}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
