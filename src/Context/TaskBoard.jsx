import React, { useEffect, useState } from "react";
import StatusLayout from "./StatusLayout";

const TaskBoard = (props) => {
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Stroage
 


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
    console.log(newTask);
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

  return (
    <div className="p-8">
      

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do */}
          <StatusLayout
            id="to-do"
            date_format = {props.date_format}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleEditTask = {handleEditTask}
            handleChangePriority = {handleChangePriority}
            handleChangeStatus = {handleChangeStatus}
            handleDeleteTask = {handleDeleteTask}
            status="To Do"
            tasks = {tasks}

          />
          {/* Doing */}
          <StatusLayout
            id="doing"
            date_format = {props.date_format}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleEditTask = {handleEditTask}
            handleChangePriority = {handleChangePriority}
            handleChangeStatus = {handleChangeStatus}
            handleDeleteTask = {handleDeleteTask}
            status="Doing"
            tasks = {tasks}
          />
          {/* Done */}
          <StatusLayout
            id="done"
            date_format = {props.date_format}
             openModal = {props.setOpenModal}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleEditTask = {handleEditTask}
            handleChangePriority = {handleChangePriority}
            handleChangeStatus = {handleChangeStatus}
            handleDeleteTask = {handleDeleteTask}
            status="Done"
            tasks = {tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;