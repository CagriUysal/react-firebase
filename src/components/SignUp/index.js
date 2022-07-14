import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ROUTES } from "../../constants/routes";
import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

function SignUpPage() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [{ username, email, passwordOne, passwordTwo }, setInfo] =
    useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, passwordOne);
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
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export const SignUpLink = () => (
  <p>
    Don&lsquo;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;
