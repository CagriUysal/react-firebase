import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import { ROUTES } from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
};

function SignInPage() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  const [{ email, password }, setInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setInfo(INITIAL_STATE);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const isInvalid = password === "" || email === "";

  return (
    <div>
      <h1>Sign In</h1>
      <p>
        Don&lsquo;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
      <p>
        <p>
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </p>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default SignInPage;
