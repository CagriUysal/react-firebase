import React from "react";

import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, useCurrentUser } from "../Session";

function AccountPage() {
  const currentUser = useCurrentUser();

  return (
    <div>
      <h1>Account: {currentUser.email} </h1>
      <PasswordChangeForm />
    </div>
  );
}

const condition = (currentUser) => !!currentUser;
export default withAuthorization(condition)(AccountPage);
