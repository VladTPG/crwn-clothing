/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADINujV0Am4Jv2NbHaMZeJBZtvEpnJxuY",
  authDomain: "crwn-clothing-db-95a0d.firebaseapp.com",
  projectId: "crwn-clothing-db-95a0d",
  storageBucket: "crwn-clothing-db-95a0d.appspot.com",
  messagingSenderId: "178062639572",
  appId: "1:178062639572:web:60259417183633027f9641",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};
