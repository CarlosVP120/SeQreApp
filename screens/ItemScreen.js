import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Circle, Marker } from "react-native-maps";

export default function ItemScreen() {
  const [icon, setIcon] = useState("alert-circle");
  const navigation = useNavigation();
  const { params } = useRoute();
  let item = params;

  useEffect(() => {
    if (item.categoria === "Alertas") {
      setIcon("broadcast");
    } else if (item.categoria === "Emergencias") {
      setIcon("alert-decagram-outline");
    } else if (item.categoria === "Vialidad") {
      setIcon("road-variant");
    }
  }, []);

  let markerRef = useRef(null);

  let mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: item.lat,
        longitude: item.lng,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      });

      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.showCallout();
        }
      }, 1000);
    }
  });

  let fecha = new Date(item.fecha).toLocaleString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <View style={{ height: "100%", paddingTop: "4%" }}>
      <StatusBar style="light" />
      {/* Go back touchable*/}

      <TouchableOpacity
        className="flex-row w-10 h-10 justify-center items-center rounded-full p-5 absolute top-4 left-2 z-20 bg-transparent"
        onPress={() => navigation.goBack()}
      >
        <Icon.ArrowLeft className="" height={30} width={30} stroke="black" />
      </TouchableOpacity>

      <View className="flex-[1] flex-row justify-center">
        <Text className="text-gray-600 text-xl font-bold px-5 pt-1">
          {new Date(item.fecha).toLocaleString("es-MX", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
      </View>
      <View className="flex-[10] flex-col items-center mt-3">
        <MaterialCommunityIcons
          className=" ml-auto"
          name={icon}
          color="#59c1cc"
          size={80}
        />
        <Text className="text-gray-600 text-lg font-semibold px-5 pt-1 ">
          {item.categoria} - {item.tipo}
        </Text>
        <Text className="text-gray-600 text-lg px-5 pt-4">{fecha}</Text>
        {/* Divider */}
        <View
          className="bg-gray-300 h-0.5 w-11/12 mx-4 mt-4 rounded-xl"
          style={{ opacity: 1 }}
        />
        <Text className="text-gray-600 text-lg font-bold px-5 pt-4">
          Ubicación
        </Text>
        <Text className="text-gray-600 text-lg px-5 pt-1">
          {item.direccion}
        </Text>
        <Text className="text-gray-600 text-lg font-bold px-5 pt-4">
          Detalles
        </Text>
        <Text className="text-gray-600 text-lg px-5 pt-1">{item.detalles}</Text>
      </View>
      <MapView
        userInterfaceStyle="light"
        initialRegion={{
          latitude: item.lat,
          longitude: item.lng,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}
        style={{ flexGrow: 1, width: "100%", height: 340 }}
        showsUserLocation={true}
        ref={mapRef}
      >
        <Marker
          ref={markerRef}
          coordinate={{ latitude: item.lat, longitude: item.lng }}
          title={item.tipo}
          description={item.direccion}
          identifier="destination"
        />
        <Circle
          center={{ latitude: item.lat, longitude: item.lng }}
          radius={80}
          fillColor={"rgba(51, 153, 255,0.2)"}
          strokeColor={"rgba(51, 153, 255,0.8)"}
        />
      </MapView>
    </View>
  );
}
