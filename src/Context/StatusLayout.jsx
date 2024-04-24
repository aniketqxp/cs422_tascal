import React from "react";
import Action from "./Action";
import "./StatusLayout.css"; // Import the CSS file

function StatusLayout(props) {
  return (
    <div className="status-layout p-8">
      <h2 className="status-title">{props.status}</h2>
      {props.getTasksByStatus(props.status).map((task, index) => (
        <div key={index} className="task-item" onClick={() => props.setSelectedTask(task)}>
          <b>{task.text}</b> <br></br>
          - {props.date_format(task.time)}
          {props.selectedTask === task && (
            <Action
              status={props.status}
              openModal={props.setOpenModal}
              handleEditTask={props.handleEditTask}
              handleChangePriority={props.handleChangePriority}
              handleChangeStatus={props.handleChangeStatus}
              handleDeleteTask={props.handleDeleteTask}
              selectedTask={props.selectedTask}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default StatusLayout;