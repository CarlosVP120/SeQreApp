import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "./slices/userLocationSlice";
import ItemScreen from "./screens/ItemScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NewItemScreen from "./screens/NewItemScreen";

const Stack = createNativeStackNavigator();

export default function Navigation({ currentLocation }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentLocation) {
      dispatch(setLocation(currentLocation));
    }
  }, [currentLocation]);

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
          options={{ gestureEnabled: false, presentation: "fullScreenModal" }}
          children={() => <LoginScreen />}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ gestureEnabled: false }}
          children={() => <OnboardingScreen />}
        />
        <Stack.Screen
          name="Home"
          options={{ gestureEnabled: false }}
          children={() => <HomeScreen />}
        />
        <Stack.Screen
          name="ItemScreen"
          children={() => <ItemScreen />}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="CategoryScreen"
          children={() => <CategoryScreen />}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            contentStyle: { backgroundColor: "transparent" },
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="NewItemScreen" component={NewItemScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
