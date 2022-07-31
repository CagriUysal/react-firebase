import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseContext } from "../Firebase";

export const CurrentUserContext = React.createContext(null);

function CurrentUserProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function handleAuthStateChange() {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export default CurrentUserProvider;
