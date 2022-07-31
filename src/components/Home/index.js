import React from "react";

import { withAuthorization } from "../Session";

function HomePage() {
  return <h1>HomePage</h1>;
}

const condition = (currentUser) => !!currentUser;
export default withAuthorization(condition)(HomePage);
