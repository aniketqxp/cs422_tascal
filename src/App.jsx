import React, { useState } from "react";
import "./App.css";
import TaskDashborad from "./Context/TaskDashborad";
import GreenScene from "./Context/GreenScreen";
import BlueScene from "./Context/BlueScreen";

function App() {
  const [currentScene, setCurrentScene] = useState("taskDashboard");

  const handleClick = () => {
    switch (currentScene) {
      case "taskDashboard":
        setCurrentScene("blueScene");
        break;
      case "blueScene":
        setCurrentScene("greenScene");
        break;
      case "greenScene":
        setCurrentScene("taskDashboard");
        break;
      default:
        setCurrentScene("taskDashboard");
    }
  };

  return (
    <div onClick={handleClick} style={{ height: "100vh", width: "100vw" }}>
      {currentScene === "taskDashboard" && <TaskDashborad />}
      {currentScene === "greenScene" && <GreenScene />}
      {currentScene === "blueScene" && <BlueScene />}
    </div>
  );
}

export default App;