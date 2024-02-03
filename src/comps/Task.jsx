import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // replace './firebase' with the path to your Firebase configuration
import { useState } from "react";

export const Task = ({ id, title, description, completed, userId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCompleted, setNewCompleted] = useState(completed);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setNewCompleted(e.target.checked);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    const docRef = doc(db, `users/${userId}/agenda/${id}`);
    await updateDoc(docRef, {
      title: newTitle,
      description: newDescription,
      completed: newCompleted,
    });
    window.location.reload();
  };
  const deleteTask = async () => {
    console.log(id);
    const docRef = doc(db, `users/${userId}/agenda/${id}`);
    await deleteDoc(docRef);
    window.location.reload();
  };

  return (
    <div className="task-container">
      <h2 className="task-title">{title}</h2>
      <p className="task-description">{description}</p>
      <p className="task-status">{completed ? "Completed" : "Not completed"}</p>
      <form onSubmit={updateTask}>
        <label>
          Title:
          <input type="text" value={newTitle} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={newDescription} onChange={handleDescriptionChange} />
        </label>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={newCompleted}
            onChange={handleCompletedChange}
          />
        </label>
        <button type="submit">Update Task</button>
      </form>
      <button className="delete-button" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};
