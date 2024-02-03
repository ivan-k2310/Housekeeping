import React from "react";
import { Logout } from "./Logout";
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
          <Logout></Logout>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};
export default RouteAuth;
