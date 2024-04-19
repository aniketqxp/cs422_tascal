import { useState, useEffect } from 'react';

const TaskFunction = (initialTasks = []) => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

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
};

export default TaskFunction;
