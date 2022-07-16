import React, { useContext } from "react";
import { signOut } from "firebase/auth";

import { FirebaseContext } from "../Firebase";

function SignOutButton() {
  const { auth } = useContext(FirebaseContext);

  const handleClick = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Sign Out</button>;
}

export default SignOutButton;
