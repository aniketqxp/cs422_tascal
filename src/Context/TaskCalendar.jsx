import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditTask from "./EditTask";

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [editTask, setEditTask] = useState(null);

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

  

  const handleTaskSubmit = () => {
    if (textInput.trim() === "" || selectedTime === "") {
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
    setSelectedTime("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setEditTask(null),
  });

  const sortedTasks = tasks.sort((a, b) => {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);
    return timeA - timeB;
  });

  return (
    <div>
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
          <div className="">
            <input
              type="datetime-local"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full border rounded p-2"
            />
          </div>
          <button onClick={handleTaskSubmit} className="btn btn-secondary">
            Add Task
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <div key={task.id} className="task-item" {...handlers}>
              <div className="task-box">
                <div>{task.text}</div>
                <div>{task.time}</div>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editTask && <EditTask task={editTask} />}
    </div>
  );
};

export default TaskCalendar;
