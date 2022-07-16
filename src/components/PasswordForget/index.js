import React, { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = "";

function PasswordForgetPage() {
  const [email, setEmail] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const { auth } = useContext(FirebaseContext);

  console.log(auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setEmail(INITIAL_STATE);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const isInvalid = email === "";

  return (
    <div>
      <h1>Password Forget</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default PasswordForgetPage;
