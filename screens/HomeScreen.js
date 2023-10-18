import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Header from "../components/Header";
import { data } from "../constants";
import * as Icon from "react-native-feather";
import CategoryCard from "../components/CategoryCard";
import ItemCard from "../components/ItemCard";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";
import GetFirestore from "../utils/GetFirestoreInRealTime";

export default function HomeScreen() {
  const [recentView, setRecentView] = useState(false);
  const navigation = useNavigation();
  let location = useSelector(selectLocation);

  //   Merge all of the "items" from each category into a single array, but to each item, add its category name
  const items = data.categories.reduce((acc, categoria) => {
    return [
      ...acc,
      ...categoria.items.map((item) => ({
        ...item,
        categoria: categoria.categoryTitle,
      })),
    ];
  }, []);

  // Get the width of the screen
  const width = Dimensions.get("window").width;

  return (
    <View className="flex-1 h-screen">
      <StatusBar style="dark" />
      <Header />
      <View className="flex-row justify-between px-3">
        <Text className="text-blue-500 text-3xl font-bold">Cerca de ti</Text>
        <TouchableOpacity
          className="flex-row items-center justify-center shadow-md bg-gray-100 rounded-full px-3 py-2"
          onPress={() => setRecentView(!recentView)}
        >
          <Text className="text-gray-600 text-sm font-bold">
            {recentView ? "Todos" : "Recientes"}
          </Text>
          <Icon.Clock className="ml-1" height={15} width={15} stroke="black" />
        </TouchableOpacity>
      </View>
      {/* Divider */}
      <View
        className="bg-gray-200 h-0.5 w-full mx-4 mt-2"
        style={{ opacity: 0.5 }}
      />
      <ScrollView
        className="flex-[10]"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      >
        {recentView ? (
          items.map((item, index) => <ItemCard item={item} key={index} />)
        ) : (
          <>
            {/* Promotional slider */}
            <View className="flex-1 flex-col justify-center items-center mx-3 mt-3">
              <Image
                source={{
                  uri: "https://as1.ftcdn.net/v2/jpg/02/21/70/40/1000_F_221704033_600ld1AP1KcDiXMw7FFAnmDkslBVCTn8.jpg",
                }}
                className="w-full h-40 rounded-xl"
              />
              <View className="flex-col justify-center items-center bg-gray-200 border border-blue-500/30 mt-3 rounded-2xl">
                <Text className="text-blue-500 text-xl font-semibold px-5 pt-1">
                  ¡Por una ciudad más segura!
                </Text>
                <Text className="text-gray-600 text-lg px-5 py-2 text-center">
                  Comparte con tu comunidad lo que está pasando cerca de ti.
                </Text>
              </View>
            </View>

            {data.categories.map((item, index) => (
              <CategoryCard item={item} key={index} />
            ))}
          </>
        )}
      </ScrollView>
      {/* Plus Icon */}
      <TouchableOpacity
        className="flex-row w-16 h-16 justify-center items-center rounded-full p-5 absolute bottom-5 right-5 z-20 bg-blue-500"
        onPress={() => {
          if (location) {
            navigation.navigate("NewItemScreen");
          }
        }}
      >
        <Icon.Plus className="" height={35} width={35} stroke="white" />
      </TouchableOpacity>
      <GetFirestore />
    </View>
  );
}
