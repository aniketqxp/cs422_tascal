import React, { useState } from "react";
import "./App.css";
import TaskList from "./Context/TaskList";
import TaskBoard from "./Context/TaskBoard";
import TaskCalendar from "./Context/TaskCalendar";
import Menu from "./Context/Menu";

function App() {
  const [currentScene, setCurrentScene] = useState("taskList");

  const handleSceneChange = (scene) => {
    setCurrentScene(scene);
  };

  return (
    <div>
      {/* Top bar with app name and menu button */}
      <div className="top-bar">
      <button className="menu-button" onClick={() => handleSceneChange("menu")}>
          ☰
        </button>
        <span className="app-name">TasCal</span>
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
      {currentScene === "calendar" && <TaskCalendar />}
      {currentScene === "board" && <TaskBoard />}
      {currentScene === "list" && <TaskList />}
      {currentScene === "menu" && <Menu />}
    </div>
  );
}

export default App;
