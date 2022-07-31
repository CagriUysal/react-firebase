import { doc, setDoc } from "firebase/firestore";

import { db } from "./config";

export function getUserRef(uid) {
  return doc(db, `users/${uid}`);
}

export function setUser(uid, data) {
  return setDoc(getUserRef(uid), data);
}
