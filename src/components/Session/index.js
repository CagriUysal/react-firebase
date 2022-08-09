import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, FirebaseContext } from "../Firebase";
import { ROUTES } from "../../constants/routes";
import { getUser } from "../Firebase/db";

export const CurrentUserContext = React.createContext(null);

function CurrentUserProvider({ children }) {
  const { auth } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(function handleAuthStateChange() {
    const unSubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        return;
      }

      const dbUser = await getUser(authUser.uid);
      if (!dbUser.roles) dbUser.roles = {}; // default empty roles

      const currentUser = {
        ...dbUser,
        uid: authUser.uid,
        emailVerified: authUser.emailVerified,
        provoderData: authUser.providerData,
      };
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
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
      if (!currentUser.emailVerified) {
        return <EmailNotVerified />;
      }

      return <Component {...props} />;
    };

    return WithAuthorization;
  };

  return HOC;
}

function EmailNotVerified() {
  const [isSent, setIsSent] = useState(false);

  const handleEmailSend = async () => {
    await sendEmailVerification(auth.currentUser, {
      url: "http://localhost:3000",
    });
    setIsSent(true);
  };

  return (
    <div>
      {isSent ? (
        <p>
          E-Mail confirmation sent: Check you E-Mails (Spam folder included) for
          a confirmation E-Mail. Refresh this page once you confirmed your
          E-Mail.
        </p>
      ) : (
        <p>
          Verify your E-Mail: Check your E-Mails (Spam folder included) for a
          confirmation E-Mail or send another confirmation E-Mail.
        </p>
      )}

      <button type="button" onClick={handleEmailSend} disabled={isSent}>
        Send confirmation E-Mail
      </button>
    </div>
  );
}

export default CurrentUserProvider;
