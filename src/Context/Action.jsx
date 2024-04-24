import React from "react";

const Action = (props) => {
  return (
    <div className="mt-2 space-x-2">
      <button // Edit
        className="btn btn-secondary"
        onClick={
          () => {
            props.setOpenModal(true);
          }
        }
      >Edit</button>

      <button // Delete
        className="btn btn-secondary"
        onClick={() => {
          props.handleDeleteTask();
          window.alert(
            `${props.selectedTask.text} Deleted Successfully `
          );
        }}
      >Delete</button>

    </div>
  );
};

export default Action;
