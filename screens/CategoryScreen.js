import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { data } from "../constants";
import * as Icon from "react-native-feather";
import CategoryCard from "../components/CategoryCard";
import ItemCard from "../components/ItemCard";
import { useRoute } from "@react-navigation/native";
import CategoryHeader from "../components/CategortyHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CategoryScreen() {
  const [icon, setIcon] = useState("alert-circle");
  const { params } = useRoute();
  let item = params;

  //   Add the category name to each item
  item.items = item.items.map((individualItem) => ({
    ...individualItem,
    categoria: item.categoryTitle,
  }));

  useEffect(() => {
    if (item.categoryTitle === "Alertas") {
      setIcon("broadcast");
    } else if (item.categoryTitle === "Emergencias") {
      setIcon("alert-decagram-outline");
    } else if (item.categoryTitle === "Vialidad") {
      setIcon("road-variant");
    }
  }, []);

  return (
    <View className="flex-1 h-screen">
      <StatusBar style="dark" />
      <CategoryHeader />
      <View className="flex-row justify-center items-center px-3">
        <Text className="text-blue-500 text-3xl font-bold mr-2">
          {item.categoryTitle}
        </Text>
        <MaterialCommunityIcons name={icon} size={30} color="#3182CE" />
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
        {item.items.map((item, index) => (
          <ItemCard item={item} key={index} />
        ))}
      </ScrollView>
      {/* Plus Icon */}
      <TouchableOpacity
        className="flex-row w-14 h-14 justify-center items-center rounded-full p-5 absolute bottom-5 right-5 z-20 bg-blue-500"
        onPress={() => navigation.navigate("AddItemScreen")}
      >
        <Icon.Plus className="" height={30} width={30} stroke="white" />
      </TouchableOpacity>
    </View>
  );
}
