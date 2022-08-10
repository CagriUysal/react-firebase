import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import LandingPage from "../Landing";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

function App() {
  return (
    <Router>
      <Navigation />
      <hr />

      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForgetPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
        <Route path={`${ROUTES.ADMIN}/*`} element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
