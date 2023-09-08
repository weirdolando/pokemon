import app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

export default async function deleteDocument(collectionName, docId) {
  let result = null;
  let error = null;
  const docRef = doc(db, collectionName, docId);

  try {
    result = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
