import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase"; // replace './firebase' with the path to your Firebase configuration

export const Task = ({ id, title, description, completed, userId }) => {
  const deleteTask = async () => {
    console.log(id);
    const docRef = doc(db, `users/${userId}/agenda/${id}`); // replace 'userId' with the actual user ID
    await deleteDoc(docRef);
    window.location.reload();
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{completed ? "Completed" : "Not completed"}</p>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};
