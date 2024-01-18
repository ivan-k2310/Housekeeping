import React, { useState, useEffect } from "react";
import { CreateTasks } from "./CreateTasks";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const DashBoard = () => {
  const [userId, setUserId] = useState(""); // replace with actual user ID
  const [task, setTask] = useState({
    id: "", // replace with actual task ID
    title: "",
    description: "",
    // add other task properties here
  });
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
      } else {
        // User is signed out
        setUserId("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreateTask = () => {
    CreateTasks(userId, task);
  };

  return (
    <div>
      {/* Your dashboard code here */}
      <form onSubmit={handleCreateTask}>
        <label>
          Task ID:
          <input
            type="text"
            name="id"
            value={task.id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <button onClick={handleCreateTask}>Create Task</button>
      </form>
    </div>
  );
};
export default DashBoard;
