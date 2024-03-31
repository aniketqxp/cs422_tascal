import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditTask from "./EditTask";

const TaskCalendar = ({ tasks }) => {
  const [editTask, setEditTask] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: (event) => handleEditTask(event.task),
    onSwipedRight: (event) => handleDeleteTask(event.task.id),
  });

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleDeleteTask = (taskId) => {
    // Delete the task with the given ID
  };

  const handleMarkAsCompleted = (taskId) => {
    // Mark the task with the given ID as completed
  };

  return (
    <div>
      {tasks.map((task) => (
        <div {...handlers} key={task.id}>
          <div>
            <div>{task.text}</div>
            <div>{task.tag}</div>
          </div>
        </div>
      ))}
      {editTask && <EditTask task={editTask} />}
    </div>
  );
};

export default TaskCalendar;
