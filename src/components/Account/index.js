import React from "react";

import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

function AccountPage() {
  return (
    <div>
      <h1>Account Page</h1>
      <PasswordChangeForm />
    </div>
  );
}

const condition = (currentUser) => !!currentUser;
export default withAuthorization(condition)(AccountPage);
