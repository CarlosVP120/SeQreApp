import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function ItemCard({ item }) {
  const navigation = useNavigation();
  // Fade in animation
  const opacity = useSharedValue(0);
  const [icon, setIcon] = useState("alert-circle");

  // console.log(item);

  useEffect(() => {
    if (item.categoria === "Alertas") {
      setIcon("broadcast");
    } else if (item.categoria === "Emergencias") {
      setIcon("alert-decagram-outline");
    } else if (item.categoria === "Vialidad") {
      setIcon("road-variant");
    }
  }, []);

  const publishDateConverted = new Date(item.fecha).toLocaleString("es-MX", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 350,
      easing: Easing.ease,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity onPress={() => navigation.navigate("ItemScreen", item)}>
        <Card
          //   containerStyle={tw("p-5 rounded-lg border-0")}
          className="p-5 rounded-lg border-0"
          containerStyle={{
            padding: 20,
            borderRadius: 10,
            borderWidth: 0,
          }}
        >
          <View className="flex-col justify-between mb-3">
            <View
              style={{ width: "100%" }}
              className="flex-row justify-between items-center"
            >
              <Text className="text-lg font-bold text-gray-600">
                {item.categoria} - {item.tipo}
              </Text>
              <MaterialCommunityIcons
                className=" ml-auto"
                name={icon}
                color="#59c1cc"
                size={36}
              />
            </View>
            <Text className="text-sm text-[#59C1CC] mt-2 font-semibold">
              {publishDateConverted}
            </Text>
          </View>

          <Card.Divider />
          <Text className="text-gray-500">{item.direccion}</Text>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}
