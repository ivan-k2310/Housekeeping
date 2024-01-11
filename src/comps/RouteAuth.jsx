import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const RouteAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthentication = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          console.log("User is signed in");
        } else {
          navigate("/login");
          console.log("User is signed out");
        }
      });
    };
    checkUserAuthentication();
  }, [location, navigate]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};
export default RouteAuth;
