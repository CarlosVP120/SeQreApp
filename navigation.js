import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function Navigation({ currentLocation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          options={{ gestureEnabled: false, presentation: "fullScreenModal"  }}
          children={() => <LoginScreen />}
          
        />
        <Stack.Screen
          name="Onboarding"
          options={{ gestureEnabled: false }}
          children={() => <OnboardingScreen />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
