import app from "../config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);

export default async function getDocuments(collectionName, whereQuery) {
  let result = null;
  let error = null;
  let q = collection(db, collectionName);

  try {
    if (whereQuery.field && whereQuery.value) {
      q = query(
        collection(db, collectionName),
        where(whereQuery.field, whereQuery.operator, whereQuery.value)
      );
    }

    const querySnapshot = await getDocs(q);

    result = [];

    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
