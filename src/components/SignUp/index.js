import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ROUTES } from "../../constants/routes";
import { ROLES } from "../../constants/roles";
import { FirebaseContext } from "../Firebase";
import { setUser } from "../Firebase/db";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
};

function SignUpPage() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [{ username, email, passwordOne, passwordTwo, isAdmin }, setInfo] =
    useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        passwordOne
      );

      const roles = {};
      if (isAdmin) {
        roles[ROLES.ADMIN] = ROLES.ADMIN;
      }

      await setUser(user.uid, { username, email, roles });

      setInfo(INITIAL_STATE);
      navigate(ROUTES.HOME);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (event) => {
    setInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={handleCheck}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
