import React, { useState, useEffect } from "react";
import { CreateTasks } from "./CreateTasks";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const DashBoard = () => {
  const [userId, setUserId] = useState(""); // replace with actual user ID

  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTask = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    try {
      await CreateTasks(userId, task); // wait for the task to be added
      setTask({
        title: "",
        description: "",
        completed: false,
      }); // reset the task state
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateTask}>
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
