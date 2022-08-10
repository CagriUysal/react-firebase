import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

import { getUsersRef } from "../Firebase/db";
import { withAuthorization } from "../Session";
import { ROLES } from "../../constants/roles";
import { ROUTES } from "../../constants/routes";
import { db } from "../Firebase";

function AdminPage() {
  return (
    <>
      <h1>AdminPage</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="users/:id" element={<User />} />
      </Routes>
    </>
  );
}

export const User = () => {
  const { state } = useLocation();
  const { id: userId } = useParams();
  const [{ user, loading }, setState] = useState({
    user: state?.user,
    loading: true,
  });

  useEffect(() => {
    (async function fetchUser() {
      // navigated from /users
      if (user) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log({ ...userSnap.data() });
        setState({ user: userSnap.data(), loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    })();
  }, []);

  return (
    <div>
      <h2>User: {userId}</h2>
      {loading && <div>Loading ...</div>}
      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </div>
      )}
    </div>
  );
};

export const UserList = () => {
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
      {loading && <p>loading..</p>}
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
            <span>
              <Link to={`${ROUTES.ADMIN}/users/${user.uid}`} state={{ user }}>
                Details
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

const condition = (currentUser) =>
  currentUser && !!currentUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
