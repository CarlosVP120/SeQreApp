import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { auth } from "./firebaseConfig";
import store from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import userLocationSlice from "./slices/userLocationSlice";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get the location each 2 minutes
  useEffect(() => {
    getLocation();
    setTimeout(() => {
      setIsLoaded(true);
    }, 2700);

    const interval = setInterval(() => {
      console.log("Location refreshed")
      getLocation();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const getLocation = async () => {
    console.log("Getting location...");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos de ubicación",
          "Para poder usar la aplicación, necesitamos acceder a tu ubicación",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Permitir", onPress: () => getLocation() },
          ],
          { cancelable: false }
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log("Location fetched: ", address[0].name, ", ", address[0].city);

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address[0],
      });
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  return (
    <>
      <Provider store={store}>
        <Navigation currentLocation={currentLocation} />
        <Toast />
      </Provider>
    </>
  );
}
