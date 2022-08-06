import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../Firebase";
import { setUser } from "../Firebase/db";
import { ROUTES } from "../../constants/routes";

function SignInWithGoogle() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await setUser(user.uid, {
        username: user.displayName,
        email: user.email,
        roles: {},
      });
      setError(null);
      navigate(ROUTES.HOME);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignInWithGoogle;
