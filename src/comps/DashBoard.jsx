import React, { useState, useEffect } from "react";
import { CreateTasks } from "./CreateTasks";
import { Task } from "./Task";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // replace './firebase' with the path to your Firebase initialization file
export const DashBoard = () => {
  const [userId, setUserId] = useState(""); // replace with actual user ID

  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        readTasks(user.uid);
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
    window.location.reload();
  };
  const readTasks = async (userId) => {
    console.log(userId);
    const tasksCol = collection(db, `users/${userId}/agenda`);
    const taskSnapshot = await getDocs(tasksCol);
    const tasks = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasks); // Update the tasks in the state
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
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          userId={userId}
        />
      ))}
    </div>
  );
};
export default DashBoard;
