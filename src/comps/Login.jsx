import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "./firebase";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserAuthentication = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          console.log("User is signed in");
          navigate("/dashboard");
          console.log(user);
        } else {
          console.log("User is signed out");
        }
      });
    };
    checkUserAuthentication();
  }, [location, navigate]);

  const handleLogin = (loginEmail, loginPassword) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        setLoginEmail("");
        setLoginPassword("");
        const user = userCredential.user;
        console.log(`Logged in as ${user.email}`);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/invalid-email":
            console.error("The email address is not valid.");
            break;
          case "auth/user-disabled":
            console.error(
              "The user account has been disabled by an administrator."
            );
            break;
          case "auth/user-not-found":
            console.error(
              "There is no user record corresponding to this email."
            );
            break;
          case "auth/wrong-password":
            console.error("The password is invalid for the given email.");
            break;
          default:
            console.error(errorMessage);
            break;
        }
      });
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={() => handleLogin(loginEmail, loginPassword)}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
