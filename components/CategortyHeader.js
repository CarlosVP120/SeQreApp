import { View, Text, Alert, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";

export default function CategoryHeader() {
  const navigation = useNavigation();
  let location = useSelector(selectLocation);

  return (
    <SafeAreaView className="flex-row flex-[0.5] items-center justify-between mb-3 mx-4">
      <TouchableOpacity
        className={` rounded-full  flex-row justify-center items-center`}
        onPress={() => navigation.goBack()}
      >
        <Icon.ArrowLeft height={30} width={30} stroke="black" strokeWidth={2} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row justify-center items-center space-x-1 border-l-gray-300"
        onPress={() =>
          Alert.alert(
            "Ubicación",
            location?.address.name + ", " + location?.address.subregion,
            [
              {
                text: "Aceptar",
                style: "cancel",
              },
            ],
            { cancelable: true }
          )
        }
      >
        <Image
          source={require("../assets/images/icons/red-map-pin.png")}
          className="w-4 h-4"
        />
        <Text className="text-gray-600 text-xs">
          {location
            ? location?.address.name.length > 40
              ? location?.address.name.substring(0, 40) + "..."
              : location?.address.name
            : "Cargando..."}
        </Text>
        <Icon.ArrowDown height={15} width={15} stroke="black" strokeWidth={3} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
