import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "./firebase";

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return Promise.all([
          setDoc(doc(db, "users", user.uid), {
            name: name,
          }),
          addDoc(collection(db, "users", user.uid, "agenda")),
        ]);
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            console.error(
              "The email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            console.error("The email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            console.error(
              "Email/password accounts are not enabled. Enable email/password in the Firebase Console, under the Auth tab."
            );
            break;
          case "auth/weak-password":
            console.error("The password is too weak.");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign In</button>
      </div>
    </div>
  );
};
