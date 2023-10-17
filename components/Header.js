import { View, Text, Alert, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";

export default function Header() {
  const navigation = useNavigation();
  let location = useSelector(selectLocation);

  return (
    <SafeAreaView className="flex-row flex-[0.5] items-center justify-between mb-3 mx-4 bg-transparent">
      <TouchableOpacity
        className={`p-2 rounded-full shadow-md bg-gray-100 flex justify-center items-center`}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Icon.User height={25} width={25} stroke="black" />
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

      {/* <TouchableOpacity
        className={`p-2 rounded-full shadow-md bg-white flex justify-center items-center `}
        onPress={() => navigation.navigate("Cart")}
      >
        <View
          className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center"
          style={{ zIndex: 1 }}
        >
          <Text className="text-white text-xs font-bold">1</Text>
        </View>
        <Icon.ShoppingBag height={25} width={25} stroke="black" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

{
  /* <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <Icon.Search height="25" width="25" stroke="gray" />
        <TextInput
          placeholder="Productos"
          className="ml-2 flex-1 w-1/2"
          keyboardType="default"
        />
        <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300 w-1/2 ">
          <Icon.MapPin height="20" width="20" stroke="gray" />
          <Text className="text-gray-600 text-xs max-w-[130px]">
            {currentLocation?.address.name.length > 20
              ? currentLocation?.address.name.substring(0, 20) + "..."
              : currentLocation?.address.name}
          </Text>
        </View>
      </View> */
}
