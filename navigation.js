import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function Navigation({ currentLocation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          options={{ gestureEnabled: false }}
          children={() => <LoginScreen />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
