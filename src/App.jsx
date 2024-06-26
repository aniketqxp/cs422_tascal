import React, { useState, useEffect} from "react";
import "./App.css";
import TaskList from "./Context/TaskList";
import TaskBoard from "./Context/TaskBoard";
import TaskCalendar from "./Context/TaskCalendar";
import Modal from "./Context/Modal"


function App() {
  const [currentScene, setCurrentScene] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [textInput, setTextInput] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);
  


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  


  const handleSceneChange = (scene) => {
    setCurrentScene(scene);
  };

  const onClose = () => {
    setOpenModal(false);
  }

   // Display
   const dateFormat = {
    year: 'numeric', // e.g., "2024"
    month: 'long', // e.g., "April"
    day: 'numeric', // e.g., "23"
    hour: '2-digit', // e.g., "03"
    minute: '2-digit', // e.g., "00"
    hour12: true // Use AM/PM
  };

  const formatTime = (timeString) => {
    if (timeString.length === 0) {
      return null;
    }
    let date = new Date(timeString);
    
    return date.toLocaleDateString('en-US', dateFormat);
  }


  
  return (
    <div>
      <Modal
      open={openModal}
      close={onClose}
      tasks={tasks}
      setTasks={setTasks}
      selectedTask={selectedTask}
      setSelectedTask={setSelectedTask}/>

      {/* Modal menu for task submission */}


      {/* Top bar with app name and menu button */}
      <div className="top-bar">
        <span className="app-name">TasCal</span>
        <button className="btn" onClick={
          () => {
              setSelectedTask(null);
              setOpenModal(true);
            }
          }
        >Add Task</button>
      
      
      </div>

    


      {/* Second bar with selectable scenes */}
      <div className="scene-bar">
        <div className="viewselector">
          <button className={currentScene === "calendar" ? "selected" : "viewselector"} onClick={() => handleSceneChange("calendar")}>
            Calendar
          </button>
        </div>
        <button className={currentScene === "board" ? "selected" : "viewselector"} onClick={() => handleSceneChange("board")}>
          Status
        </button>
        <button className={currentScene === "list" ? "selected" : "viewselector"} onClick={() => handleSceneChange("list")}>
          Priority
        </button>
      </div>

      {/* Render the current scene based on the state */}
      
      {currentScene === "calendar" && 
        <TaskCalendar 
          openModal = {openModal}
          setOpenModal = {setOpenModal}
          textInput = {textInput}
          setTextInput = {setTextInput}
          tasks = {tasks} 
          setTasks = {setTasks}
          selectedTask = {selectedTask}
          setSelectedTask = {setSelectedTask}
          date_format = {formatTime}
        />
      }
      
      {currentScene === "board" && 
        <TaskBoard 
          openModal = {openModal}
          setOpenModal = {setOpenModal}
          tasks = {tasks}
          setTasks = {setTasks}
          selectedTask = {selectedTask}
          setSelectedTask = {setSelectedTask}
          date_format = {formatTime}
        />
      }
      
      {currentScene === "list" && 
        <TaskList
          openModal = {openModal}
          setOpenModal = {setOpenModal}
          tasks={tasks} 
          setTasks={setTasks}
          selectedTask = {selectedTask}
          setSelectedTask = {setSelectedTask}
          date_format = {formatTime}
        />
      }

    </div>
  );
}

export default App;
