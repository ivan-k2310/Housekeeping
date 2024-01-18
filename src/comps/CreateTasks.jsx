import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // assuming you have exported db from your firebase config file

export const CreateTasks = async (userId, task) => {
  if (!userId || !task) {
    console.error("Invalid arguments: userId and task must be non-empty");
    return;
  }
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/agenda`), {
      title: task.title,
      description: task.description,
      completed: task.completed,
      // add other task properties here
    });
    console.log("Task created successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error creating task: ", error);
  }
};
