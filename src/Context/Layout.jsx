import React from "react";
import Action from "./Action";
import "./Layout.css"


function Layout(props) {
  return (
    <div className="layout p-8">
      <h2 className="status-title">
        {props.level} Priority
      </h2>
      {props.getTasksByPriority(props.level).map((task, index) => (
        <div key={index} className="task-item" onClick={() => props.setSelectedTask(task)}>
          <b>{task.text}</b> <br/>
          🗓️ {props.date_format(task.time)} <br/>
          🔨 {task.status}
          {props.selectedTask === task && (
            <>
              <Action
                priority={props.level}
                handleEditTask={props.handleEditTask}
                handleChangePriority={props.handleChangePriority}
                handleDeleteTask={props.handleDeleteTask}
                selectedTask={props.selectedTask}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Layout;
