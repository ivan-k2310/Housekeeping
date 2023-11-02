// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5vWDmZ5bGji9JEFJhLaO9Jp__I1IuP4s",
  authDomain: "manager-78a6e.firebaseapp.com",
  projectId: "manager-78a6e",
  storageBucket: "manager-78a6e.appspot.com",
  messagingSenderId: "845609197828",
  appId: "1:845609197828:web:c903a449e7c46886bb3051",
  measurementId: "G-KM0MW6HYEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
