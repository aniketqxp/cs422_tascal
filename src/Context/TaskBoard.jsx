import React, { useEffect, useState } from "react";
import StatusLayout from "./StatusLayout";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("To Do");
    const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Stroage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  return (
    <div className="p-8">
      <div className="lg:flex grid gap-2 items-center font-main">
        <div className="">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full lg:w-96 border rounded p-2"
            placeholder="Enter task"
          />
        </div>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Add Task
        </button>
      </div>

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do */}
          <StatusLayout
            getTasksByStatus={getTasksByStatus}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            status="To Do"
          />
          {/* Doing */}
          <StatusLayout
            getTasksByStatus={getTasksByStatus}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            status="Doing"
          />
          {/* Done */}
          <StatusLayout
            getTasksByStatus={getTasksByStatus}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleChangeStatus={handleChangeStatus}
            handleDeleteTask={handleDeleteTask}
            status="Done"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
