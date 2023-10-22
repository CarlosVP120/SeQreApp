import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebaseConfig";
import { View } from "react-native";
import { onSnapshot, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";
import { setDB, selectDB } from "../slices/dbSlice";

export default function GetFirestore() {
  const navigation = useNavigation();
  let location = useSelector(selectLocation);
  const dispatch = useDispatch();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dateFormatted = day + "" + month + "" + year;

  useEffect(() => {
    if (location) {
      // Get the collection city document subregion and set it to redux
      onSnapshot(
        doc(db, location.address.city, `${location.address.postalCode}-${dateFormatted}`),
        (doc) => {
          if (doc.exists()) {
            console.log(
              "Found document data for " + location.address.postalCode
            );
            let data = doc.data();
            dispatch(setDB(data));
          } else {
            console.log("No such document!");
          }
        }
      );
    }
  }, [location]);

  return <View></View>;
}
