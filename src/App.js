import { useState, useEffect } from "react";
import "./App.css";
import Login from "./comps/Login";
import { db } from "./comps/firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  const movieListRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieListRef);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
