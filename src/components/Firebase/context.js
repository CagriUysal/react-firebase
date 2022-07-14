import React from "react";

import * as firebase from "./config";

export const FirebaseContext = React.createContext(null);

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
}
