import React, { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";

import { getUsersRef } from "../Firebase/db";
import { withAuthorization } from "../Session";
import { ROLES } from "../../constants/roles";

function AdminPage() {
  const [{ users, loading }, setState] = useState({ users: [], loading: true });

  useEffect(() => {
    const q = query(getUsersRef());
    const unsub = onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.forEach((userDoc) => {
        users.push({ ...userDoc.data(), uid: userDoc.id });
      });
      setState({ users, loading: false });
    });

    return () => unsub();
  }, []);

  return (
    <>
      <h1>AdminPage</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </>
  );
}

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}{" "}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}{" "}
        </span>
        <span>
          <strong>Username:</strong> {user.username}{" "}
        </span>
      </li>
    ))}
  </ul>
);

const condition = (currentUser) =>
  currentUser && !!currentUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
