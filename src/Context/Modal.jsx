import React, { useEffect, useState } from "react";

const Modal = (props) => { 

  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Stroag

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
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

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };


  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangeStatus = (newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };


  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

    if (!props.open) {
        return null;
    }
    console.log("After update: ", tasks);

    return (
        <div className="overlay">
            <div className="modalContainer">
                <p onClick={props.close} className="closeButton">X</p>  
                <br/>
                <h1 className="modalTitle">Task</h1>
                <div className="textInput inputField">
                    <input type="text" value={textInput} onChange={handleTextInputChange} className="w-full lg:w-96 border rounded p-2" placeholder="Enter task name"/>
                </div>
                <div className="dateInput inputField">
                    <p></p>
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
                  <button class="btn" onClick={() => {
                    handleTaskSubmit();
                    props.close();
                  }}>Submit</button>

                </div>
                
            </div>
        </div>
    );
}

export default Modal;