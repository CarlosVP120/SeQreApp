import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeJ-qAHkkT-GTYvmfhvWGBhSvOR79tob4",

  authDomain: "seqre-app.firebaseapp.com",

  projectId: "seqre-app",

  storageBucket: "seqre-app.appspot.com",

  messagingSenderId: "1042700870612",

  appId: "1:1042700870612:web:f4496a62b276cf3b33ec41",
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default getFirestore(app);
