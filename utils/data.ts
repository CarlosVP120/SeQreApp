import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    text: "Reporta incidentes a la policía",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 2,
    animation: require("../assets//animations/Lottie2.json"),
    text: "Notifica a las personas cercanas",
    textColor: "#7D3C98",
    backgroundColor: "#ffffff",
  },
  {
    id: 3,
    animation: require("../assets//animations/Lottie3.json"),
    text: "Contribuye a la seguridad de tu comunidad",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export default data;
