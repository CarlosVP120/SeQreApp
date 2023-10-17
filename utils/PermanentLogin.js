import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { View } from "react-native";

export default function PermanentLogin() {
  const navigation = useNavigation();

  useEffect(() => {
    // Permanent login
    onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser = user;
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  return <View></View>;
}
