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

export default function CategoryCard({ item }) {
  const [icon, setIcon] = useState("alert-circle");
  // Fade in animation
  const opacity = useSharedValue(0);
  const navigation = useNavigation();
  
  useEffect(() => {
    if (item.categoryTitle === "Alertas") {
      setIcon("broadcast");
    } else if (item.categoryTitle === "Emergencias") {
      setIcon("alert-decagram-outline");
    } else if (item.categoryTitle === "Vialidad") {
      setIcon("road-variant");
    }
  }, []);

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
      <TouchableOpacity
        onPress={() => navigation.navigate("CategoryScreen", item)}
      >
        <Card
          //   containerStyle={tw("p-5 rounded-lg border-0")}
          className="p-5 rounded-lg border-0"
          containerStyle={{
            padding: 20,
            borderRadius: 10,
            borderWidth: 0,
          }}
        >
          <View>
            <View className="flex-col justify-between">
              <View
                style={[{ maxWidth: "100%" }]}
                className="flex-row justify-between items-center"
              >
                <Text className="text-2xl font-bold">{item.categoryTitle}</Text>
                <View className="flex-row items-center justify-start">
                  <Text style={{ color: "#59c1cc" }}>{item.items.length}</Text>

                  <MaterialCommunityIcons
                    name={icon}
                    color="#59c1cc"
                    size={36}
                    style={{ marginLeft: 5 }}
                  />
                </View>
              </View>
              <Text className="text-sm text-[#59C1CC] font-medium py-2">
              {item.zona} - {item.postalCode}
              </Text>

              <View className="flex-row items-start justify-end pb-1 gap-x-2"></View>
            </View>
          </View>
          <Card.Divider />
          <Text className="text-gray-500">{item.ciudad}</Text>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}
