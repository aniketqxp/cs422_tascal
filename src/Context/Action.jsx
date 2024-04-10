import React from "react";

const Action = (props) => {
  return (
    <div className="mt-2 space-x-2">
      <button // Edit
        className="btn btn-secondary"
        onClick={() =>
          props.handleEditTask(prompt("Edit task:", props.selectedTask.text))
        }
      >Edit</button>

      <button // Change Priority
        className="btn btn-secondary"
        onClick={() =>
          props.handleChangePriority(
            prompt("Enter new priority:", props.selectedTask.priority)
          )
        }
      >Change Priority</button>

      <button // Change Status
        className="btn btn-secondary"
        onClick={() =>
          props.handleChangeStatus(
            prompt("Enter new status:", props.selectedTask.status)
          )
        }
      >Change Status</button>

      <button // Delete
        className="btn btn-secondary"
        onClick={() => {
          window.alert(
            `Press Sure Wan't Delete ${props.priority} Priority Task`
          );
          props.handleDeleteTask();
        }}
      >Delete</button>

    </div>
  );
};

export default Action;
