import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { data } from "../constants";
import * as Icon from "react-native-feather";
import CategoryCard from "../components/CategoryCard";
import ItemCard from "../components/ItemCard";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";
import GetFirestore from "../utils/GetFirestoreInRealTime";
import { setDB, selectDB } from "../slices/dbSlice";

export default function HomeScreen() {
  const [recentView, setRecentView] = useState(false);
  const navigation = useNavigation();
  let location = useSelector(selectLocation);
  let db = useSelector(selectDB);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  // Set the data from the db
  useEffect(() => {
    if (db)   {
      // Add the category to each of the items of each of the categories in the data array
      setData(Object.values(db).map((categoria) => ({
        ...categoria,
        postalCode: location?.address.postalCode,
        items: categoria.items.map((item) => ({
          ...item,
          categoria: categoria.categoryTitle,
        })),
      })).sort((a, b) => b.items.length - a.items.length));

    } 
  }
  , [db]);

  // Set the items from the data
  useEffect(() => {
    if (data) {
      // Merge all of the "items" from each category into a single array
      //  After that, sort the array by date, show the most recent first, the date is in ISO format
      setItems(
        data.reduce((acc, categoria) => {
          return acc.concat(
            categoria.items.map((item) => ({
              ...item
            }
            ))
          );
        }, [])
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      );
    }
  }
  , [data]);

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
        {
          db ? (
            recentView ? (
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
    
                {
                data.map((item, index) => (
                  <CategoryCard item={item} key={index} />
                ))
                }
              </>
            )
          )
         : (
          <View className="flex-1 flex-col justify-start items-center mx-3 mt-3">
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

            <Text className="text-blue-400 text-xl font-semibold px-5 mt-20 text-center">
              Aun no hay registros en tu zona, ¡Se el primero en reportar!
            </Text>
          </View>
        )
        }
      
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
