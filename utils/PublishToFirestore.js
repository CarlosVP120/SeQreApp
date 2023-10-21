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
  let subregion = currentLocation.address.subregion;

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

  console.log(item)

  const citiesRef = collection(db, city);
  const snapshot = await getDocs(citiesRef);

  if (snapshot.empty) {
    console.log("No matching documents, creating collection for city: " + city);
    await setDoc(doc(db, city, subregion), {
      Alertas: {
        categoryTitle: "Alertas",
        ciudad: city,
        zona: subregion,
        items: type === "Alertas" ? [item] : [],
      },

      Emergencias: {
        categoryTitle: "Emergencias",
        ciudad: city,
        zona: subregion,
        items: type === "Emergencias" ? [item] : [],
      },

      Vialidad: {
        categoryTitle: "Vialidad",
        ciudad: city,
        zona: subregion,
        items: type === "Vialidad" ? [item] : [],
      },
    });
    console.log("Collection successfully created!");
    return;
  } else {
    console.log("Collection already exists, updating city: " + city);
    // Add the item to the items array in the subregion document using the arrayUnion method
    updateDoc(doc(db, city, subregion), {
      [type]: {
        items: arrayUnion(item),
        categoryTitle: type,
        ciudad: city,
        zona: subregion,
      },
    });
  }
};
