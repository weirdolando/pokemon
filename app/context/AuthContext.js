"use client";

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import app from "@/app/firebase/config";
import CenteredScreenWrapper from "../components/CenteredScreenWrapper";
import Spinner from "../components/Spinner";

const auth = getAuth(app);
const db = getFirestore(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userFavoritePokemon, setUserFavoritePokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingAuth, setLoadingAuth] = React.useState(true);
  const [loadingFirestore, setLoadingFirestore] = React.useState(true);

  const q = user
    ? query(collection(db, "FAVORITES"), where("user_id", "==", user.uid))
    : null;

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    if (loadingAuth && loadingFirestore) {
      setLoading(false);
    }

    return () => unsubscribeAuth();
  }, []);

  React.useEffect(() => {
    let unsubscribeFirestore;

    if (user) {
      unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({ docId: doc.id, ...doc.data() });
        });

        setUserFavoritePokemon(result);
        setLoadingFirestore(false);
      });
    }

    if (loadingAuth && loadingFirestore) {
      setLoading(false);
    }

    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userFavoritePokemon }}>
      {loading ? (
        <CenteredScreenWrapper>
          <Spinner />
        </CenteredScreenWrapper>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
