import React, { useContext, useState } from "react";
import { updatePassword } from "firebase/auth";

import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
};

function PasswordChangeForm() {
  const [{ passwordOne, passwordTwo }, setPasswords] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const { auth } = useContext(FirebaseContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      await updatePassword(user, passwordOne);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
      />{" "}
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default PasswordChangeForm;
