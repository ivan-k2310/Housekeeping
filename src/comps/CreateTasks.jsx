import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // assuming you have exported db from your firebase config file

export const CreateTasks = (userId, task) => {
  if (!userId || !task || !task.id) {
    console.error("Invalid arguments: userId and task.id must be non-empty");
    return;
  }
  setDoc(doc(collection(db, `users/${userId}/agenda`), task.id), {
    title: task.title,
    description: task.description,
    // add other task properties here
  })
    .then(() => {
      console.log("Task created successfully");
    })
    .catch((error) => {
      console.error("Error creating task: ", error);
    });
};
