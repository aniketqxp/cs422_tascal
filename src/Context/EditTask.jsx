// EditTask.jsx
import React from "react";

const EditTask = ({ task }) => {
  // Implement the edit task UI and functionality here
  return (
    <div>
      <div>Edit Task: {task.text}</div>
      <div>Tag: {task.tag}</div>
    </div>
  );
};

export default EditTask;
