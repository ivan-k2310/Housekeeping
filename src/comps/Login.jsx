import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "./firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return setDoc(doc(collection(db, "users"), user.uid), {
          name: name,
        });
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
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

  const handleLogin = (loginEmail, loginPassword) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        setLoginEmail("");
        setLoginPassword("");
        const user = userCredential.user;
        console.log(`Logged in as ${user.email}`);
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
    <div>
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
      <div>
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
