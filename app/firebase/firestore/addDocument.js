import app from "../config";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const db = getFirestore(app);

export default async function addDocument(collectionName, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, collectionName), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
