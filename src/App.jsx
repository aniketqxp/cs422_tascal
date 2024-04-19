import React, { useState, useEffect} from "react";
import "./App.css";
import TaskList from "./Context/TaskList";
import TaskBoard from "./Context/TaskBoard";
import TaskCalendar from "./Context/TaskCalendar";
import Modal from "./Context/Modal"


function App() {
  const [currentScene, setCurrentScene] = useState("taskList");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    console.log('updated tasks', tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [openModal, setOpenModal] = useState(false);


  const handleSceneChange = (scene) => {
    setCurrentScene(scene);
  };

  const onClose = () => {
    setOpenModal(false);
  }

  return (
    <div>
      <Modal open={openModal} close={onClose} tasks={tasks} setTasks={setTasks}/>

      {/* Modal menu for task submission */}


      {/* Top bar with app name and menu button */}
      <div className="top-bar">
      <button className="menu-button" onClick={() => handleSceneChange("menu")}>
          ☰
        </button>
        <span className="app-name">TasCal</span>
        <button className="btn" onClick={() => setOpenModal(!openModal)}>Add Task</button>
      </div>

      
      


      {/* Second bar with selectable scenes */}
      <div className="scene-bar">
        <button className={currentScene === "calendar" ? "selected" : ""} onClick={() => handleSceneChange("calendar")}>
          Calendar
        </button>
        <button className={currentScene === "board" ? "selected" : ""} onClick={() => handleSceneChange("board")}>
          Board
        </button>
        <button className={currentScene === "list" ? "selected" : ""} onClick={() => handleSceneChange("list")}>
          List
        </button>
      </div>

      {/* Render the current scene based on the state */}
      {currentScene === "calendar" && <TaskCalendar openModal={setOpenModal} tasks={tasks} setTasks={setTasks}/>}
      {currentScene === "board" && <TaskBoard openModal={setOpenModal} tasks={tasks} setTasks={setTasks}/>}
      {currentScene === "list" && <TaskList openModal={setOpenModal} tasks={tasks} setTasks={setTasks}/>}

    </div>
  );
}

export default App;
