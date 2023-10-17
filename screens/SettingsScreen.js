import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const halfScreen = Math.round(Dimensions.get("window").height / 1.3);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className="bg-transparent"
    >
      {/* View for the first half of the screen */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: halfScreen }}
        className="bg-transparent"
      ></TouchableOpacity>

      <View
        style={{
          height: halfScreen,
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "start",
        }}
        className=" rounded-2xl py-6"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute z-10 rounded-full p-3 top-3 left-1 bg-transparent"
        >
          <Icon.ArrowLeft
            strokeWidth={2.5}
            stroke="black"
            width={25}
            height={25}
          />
        </TouchableOpacity>
        <Text className="text-center text-2xl font-bold mb-3">Ajustes</Text>
        <TouchableOpacity
          className="flex-row items-center justify-center px-5 mx-5 py-3 border-b border-gray-300"
          onPress={() => auth.signOut()}
        >
          <Text className="text-lg mr-2">Cerrar sesión</Text>
          <Icon.LogOut stroke="black" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
