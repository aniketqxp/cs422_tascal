import React, { useEffect, useState } from "react";

const Modal = (props) => { 
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("Medium");

  // Properly setting initial values from props
  useEffect(() => {
    if (props.selectedTask) {
      setTextInput(props.selectedTask.text);
      setSelectedPriority(props.selectedTask.priority);
      setSelectedStatus(props.selectedTask.status);
      setSelectedTime(props.selectedTask.time);
    }
  }, [props.selectedTask]);

  // Handle Function When Click On Submit
  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      text: textInput,
      group: selectedGroup,
      time: selectedTime,
      status: selectedStatus,
      priority: selectedPriority
    };

    setTasks([...tasks, newTask]);

    setTextInput("");
    setSelectedStatus("To Do");
    setSelectedPriority("Medium");
    setSelectedTime("");
  };

  const handleEditTask = () => {
    
    if (textInput.trim() === "") {
      return;
    }
    const newTask = {
      id: props.selectedTask.id,
      text: textInput,
      group: selectedGroup,
      time: selectedTime,
      status: selectedStatus,
      priority: selectedPriority
    };

    const updatedTasks = tasks.map((task) =>
      task === props.selectedTask ? newTask : task
    );
    setTasks(updatedTasks);


  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  if (!props.open) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p onClick={props.close} className="closeButton">X</p>  
        <h1 className="modalTitle">Task</h1>
        <div className="textInput inputField">
          <input type="text" value={textInput} onChange={handleTextInputChange} className="w-full lg:w-96 border rounded p-2" placeholder="Enter task name"/>
        </div>
        <div className="dateInput inputField">
          <input type="datetime-local" value={selectedTime} onChange={handleTimeChange} className="w-full border rounded p-2"/>
        </div>
        <div className="statusInput inputField">
          <p>Enter status:</p>
          <select value={selectedStatus} onChange={handleStatusChange} className="w-full lg:w-96 border rounded p-2">
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="priorityInput inputField">
          <p>Enter priority:</p>
          <select value={selectedPriority} onChange={handlePriorityChange} className="w-full border rounded p-2">
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <div className="buttonBox">
          <button className="btn" onClick={() => {
            if (props.selectedTask) {
              handleEditTask();
            } else {
              handleTaskSubmit();
            }
            props.setSelectedTask(null);
            props.close();
          }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
