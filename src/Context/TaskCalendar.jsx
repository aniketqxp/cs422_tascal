import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditTask from "./EditTask";

const TaskCalendar = (props) => {
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [textInput, setTextInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [editTask, setEditTask] = useState(null);
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
    const newTaskText = prompt("Edit task:", task.text);
    if (newTaskText !== null && newTaskText !== task.text) {
      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return { ...t, text: newTaskText };
        }
        return t;
      });
      setTasks(updatedTasks);
    }
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
    <div className="p-8">
      <div className="mt-8 space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <div key={task.id} className="task-item" {...handlers}>
              <div className="task-box">
                <p><b>{task.text}</b></p>    
                <p>🗓️ {props.date_format(task.time)}</p>
                <p>🔨 {task.status}</p>
                <p>❗ {task.priority} Priority</p>
              </div>
              <div className="task-cal-actions">
                <button className="calendar-button" onClick={() => handleEditTask(task)}>Edit</button>
                <button className="calendar-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
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