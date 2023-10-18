import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { auth } from "../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { convertToRGBA } from "react-native-reanimated";
import PublishToFirestore from "../utils/PublishToFirestore";
import { useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";

export default function NewItemScreen() {
  const [type, setType] = useState("");
  const navigation = useNavigation();
  const halfScreen = Math.round(Dimensions.get("window").height / 1.2);
  const [open, setOpen] = useState(false);
  const [suceso, setSuceso] = useState("");
  const [items, setItems] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  let currentLocation = useSelector(selectLocation);

  useEffect(() => {
    if (type === "Alertas") {
      setItems([
        { label: "Robo", value: "Robo" },
        { label: "Robo a mano armada", value: "Robo a mano armada" },
        { label: "Persona violenta", value: "Persona violenta" },
        { label: "Violencia", value: "Violencia" },
      ]);
    } else if (type === "Emergencias") {
      setItems([
        { label: "Incendio", value: "Incendio" },
        { label: "Persona herida", value: "Persona herida" },
        { label: "Apoyo policial", value: "Apoyo policial" },
        { label: "Apoyo médico", value: "Apoyo médico" },
      ]);
    } else if (type === "Vialidad") {
      setItems([
        { label: "Choque", value: "Choque" },
        { label: "Choque fuerte", value: "Choque fuerte" },
        { label: "Calle bloqueada", value: "Calle bloqueada" },
        { label: "Embotellamiento", value: "Embotellamiento" },
        { label: "Tráfico denso", value: "Tráfico denso" },
      ]);
    } else {
      setItems([]);
    }
  }, [type]);

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
        <Text className="text-center text-2xl font-bold mb-5">Agregar</Text>
        {/* Select category bar */}
        <Text className="text-center text-lg font-bold mb-3 text-gray-600">
          Categoría
        </Text>
        <View className="flex-row items-center justify-between px-6 mx-5 py-1 border shadow-md shadow-black/20 bg-gray-200 rounded-2xl border-blue-300">
          <TouchableOpacity
            className={`flex-col items-center justify-center p-2 rounded-2xl ${
              type === "Alertas" ? "bg-white/40" : "bg-transparent"
            }`}
            onPress={() => setType("Alertas")}
          >
            <MaterialCommunityIcons
              name="broadcast"
              size={30}
              color="#59c1cc"
            />
            <Text className="text-base text-gray-600">Alerta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-col items-center justify-center p-2 rounded-2xl ${
              type === "Emergencias" ? "bg-white/40" : "bg-transparent"
            }`}
            onPress={() => setType("Emergencias")}
          >
            <MaterialCommunityIcons
              name="alert-decagram-outline"
              size={30}
              color="#59c1cc"
            />
            <Text className="text-base text-gray-600">Emergencia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-col items-center justify-center p-2 rounded-2xl ${
              type === "Vialidad" ? "bg-white/40" : "bg-transparent"
            }`}
            onPress={() => setType("Vialidad")}
          >
            <MaterialCommunityIcons
              name="road-variant"
              size={30}
              color="#59c1cc"
            />
            <Text className="text-base text-gray-600">Vialidad</Text>
          </TouchableOpacity>
        </View>
        {/* Select type selector */}
        <Text className="text-center text-lg font-bold mb-2 text-gray-600 mt-4">
          Tipo
        </Text>
        <DropDownPicker
          style={{
            borderWidth: 0.5,
            borderColor: "rgb(147 197 253)",
            borderRadius: 15,
            paddingHorizontal: 30,
            paddingVertical: 20,
            backgroundColor: "rgb(243 244 246)",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
          textStyle={{
            fontSize: 18,
            color: "rgb(59 130 246)",
          }}
          containerStyle={{
            width: "90%",
            alignSelf: "center",
            marginHorizontal: 0,
            borderRadius: 15,
          }}
          dropDownContainerStyle={{
            alignSelf: "center",
            marginHorizontal: 0,
            borderRadius: 15,
            borderColor: "#59c1cc",
          }}
          open={open}
          value={suceso}
          items={items}
          setOpen={setOpen}
          setValue={setSuceso}
          setItems={setItems}
          placeholder="Selecciona un tipo de alerta"
          theme="LIGHT"
          multiple={false}
        />
        {/* Description input */}
        <Text className="text-center text-lg font-bold mb-2 text-gray-600 mt-4">
          Descripción
        </Text>
        <View className="flex-row items-center justify-between px-6 mx-5 py-2 border bg-gray-100 rounded-2xl border-blue-300">
          <TextInput
            style={{
              paddingVertical: 20,
              width: "100%",
            }}
            onChangeText={(text) => setDescripcion(text)}
            value={descripcion}
            placeholder="Escribe una descripción"
          />
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center px-5 mx-5 py-3 bg-blue-500 rounded-2xl mt-40"
          onPress={() => {
            PublishToFirestore(type, suceso, descripcion, currentLocation);
            navigation.goBack();
          }}
        >
          <Text className="text-lg mr-2 text-white">Agregar</Text>
          <Icon.Plus stroke="white" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
