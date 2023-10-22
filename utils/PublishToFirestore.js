import { useSelector } from "react-redux";
import { selectLocation } from "../slices/userLocationSlice";
import { auth } from "../firebaseConfig";
import db from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default PublishToFirestore = async (
  type,
  suceso,
  descripcion,
  currentLocation
) => {
  // Check if the collection "cities" exists

  let city = currentLocation.address.city;
  let postalCode = currentLocation.address.postalCode;
  // Get the day in format daymonthyear, ex: 21092021
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dateFormatted = day + "" + month + "" + year;
  let zone = currentLocation.address.district;

  let currentTime = new Date();
  let currentTimeISO = currentTime.toISOString();

  const item = {
    tipo: suceso,
    direccion: currentLocation.address.name,
    lat: currentLocation.latitude,
    lng: currentLocation.longitude,
    detalles: descripcion,
    fecha: currentTimeISO + "",
  };

  const citiesRef = collection(db, city);
  const snapshot = await getDocs(citiesRef);

  if (snapshot.empty) {
    console.log("No matching documents, creating collection for city: " + city);
    await setDoc(doc(db, city, `${postalCode}-${dateFormatted}`), {
      Alertas: {
        categoryTitle: "Alertas",
        ciudad: city,
        zona: zone,
        items: type === "Alertas" ? [item] : [],
      },

      Emergencias: {
        categoryTitle: "Emergencias",
        ciudad: city,
        zona: zone,
        items: type === "Emergencias" ? [item] : [],
      },

      Vialidad: {
        categoryTitle: "Vialidad",
        ciudad: city,
        zona: zone,
        items: type === "Vialidad" ? [item] : [],
      },
    });
    console.log("Collection successfully created!");
    return;
  } else {
    console.log("Collection already exists, updating city: " + city);
    // Add the item to the items array in the subregion document using the arrayUnion method
    updateDoc(doc(db, city, postalCode), {
      [type]: {
        items: arrayUnion(item),
        categoryTitle: type,
        ciudad: city,
        zona: zone,
      },
    });
  }
};
