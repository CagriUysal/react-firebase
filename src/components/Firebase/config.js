import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXwxUA91HFHOVupqKasN2BJ5bmKMTVNpU",
  authDomain: "react-firebase-4dc84.firebaseapp.com",
  projectId: "react-firebase-4dc84",
  storageBucket: "react-firebase-4dc84.appspot.com",
  messagingSenderId: "75084205294",
  appId: "1:75084205294:web:a0da94954e7abd8685f7ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
