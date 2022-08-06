import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import { ROUTES } from "../../constants/routes";
import { getUser } from "../Firebase/db";

export const CurrentUserContext = React.createContext(null);

function CurrentUserProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function handleAuthStateChange() {
    const unSubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        setCurrentUser(null);
        return;
      }

      const dbUser = await getUser(authUser.uid);
      if (!dbUser.roles) dbUser.roles = {}; // default empty roles

      setCurrentUser({ ...dbUser, uid: authUser.uid });
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

export function withAuthorization(condition) {
  const HOC = (Component) => {
    const WithAuthorization = (props) => {
      const currentUser = useCurrentUser();
      const navigate = useNavigate();

      useEffect(() => {
        if (!condition(currentUser)) {
          navigate(ROUTES.SIGN_IN);
        }
      }, [currentUser]);

      if (!currentUser) return null;

      return <Component {...props} />;
    };

    return WithAuthorization;
  };

  return HOC;
}

export default CurrentUserProvider;
