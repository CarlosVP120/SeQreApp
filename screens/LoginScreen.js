import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, Image } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../components/TextField";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);

  return (
    <View>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/background.webp")}
        style={{ height: Dimensions.get("window").height / 2.5 }}
        className="w-full z-0"
      ></ImageBackground>

      <View
        className="bg-black h-full w-full absolute z-[1] opacity-50"
        style={{ height: Dimensions.get("window").height / 2.5 }}
      ></View>

      <SafeAreaView
        className="z-[2] absolute w-full flex justify-center items-center"
        style={{ height: Dimensions.get("window").height / 3 }}
      >
        <View className=" flex flex-col justify-center items-center">
        <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 80, height: 40 }}
            />
          <Text className="text-white text-4xl font-bold mt-2 ">
            SeQre
          </Text>

          <Text className="text-white text-base">Inicia sesión para continuar</Text>
        </View>
      </SafeAreaView>

      <View
        className="bg-white h-full rounded-t-3xl w-full z-[3]"
        style={{
          bottom: 60,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        }}
      >
        <View className="p-9">
          <Text
            style={{ color: "#5D3FD3", fontSize: 34 }}
            className="font-bold"
          >
            Bienvenid@
          </Text>
          <Text>
            ¿No tienes una cuenta?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              className="text-blue-500 italic underline"
            >
              Regístrate
            </Text>
          </Text>
          <View style={{ marginTop: 15 }}>
            <TextField
              label="Email"
              className="font-bold text-gray-500"
              value={email}
              onChangeText={(text) => setEmail(text)}
              errorText={emailError}
              onBlur={() => {
                if (email.length == 0) {
                  setEmailError("El email es requerido");
                } else if (!email.includes("@")) {
                  setEmailError("El email no es válido");
                } else {
                  setEmailError(null);
                }
              }}
            />
            <TextField
              className="font-bold mt-5 text-gray-500"
              label="Contraseña"
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
              errorText={passError}
              onBlur={() => {
                if (pass.length == 0) {
                  setPassError("La contraseña es requerida");
                } else if (pass.length < 6) {
                  setPassError("La contraseña debe tener al menos 6 caracteres");
                } else {
                  setPassError(null);
                }
              }}
            />
          </View>
          <View className="flex-row justify-end mt-6">
            <Text
              className="text-blue-500 italic underline mb-10"
              onPress={() => {
                if (!email) {
                  setEmailError("El email es requerido");
                  Alert.alert("Restablecer contraseña", "El email es requerido");
                } else if (!email.includes("@")) {
                  setEmailError("El email no es válido");
                  Alert.alert("Restablecer contraseña", "El email no es válido");
                } else if (emailError == null && email.length > 0) {
                  Alert.alert("Restablecer contraseña", "Se ha enviado un correo a " + email + " para restablecer tu contraseña");
                  sendPasswordResetEmail(auth, email);
                }
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </View>

          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (!email || !pass) {
                  if (!email && !pass) {
                    setEmailError("El email es requerido");
                    setPassError("La contraseña es requerida");
                  } else if (!email) {
                    setEmailError("El email es requerido");
                  } else if (!pass) {
                    setPassError("La contraseña es requerida");
                  }
                } else if (
                  emailError == null &&
                  passError == null &&
                  email.length > 0 &&
                  pass.length > 0
                ) {
                  handleSignIn();
                }
              }}
              style={{ width: "100%" }}
              className="flex justify-center items-center rounded-full w-3/4 mx-0 mt-10 bg-[#5D3FD3]"
            >
              <Text className="text-white self-center font-bold p-3 text-lg">
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <View className="justify-center mt-7">
              <Text className="text-gray-500 mb-4">O inicia sesión con</Text>
              <View className="flex-row justify-center">
                {/* <GoogleAuth /> */}
                <Icon
                  name="google"
                  type="font-awesome"
                  color="#db3236"
                  size={45}
                  style={{
                    borderRadius: "50%",
                    padding: 8,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: "#db3236",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
