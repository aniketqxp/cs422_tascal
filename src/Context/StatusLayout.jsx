import React from "react";
import Action from "./Action";

function StatusLayout(props) {
  return (
    <>
      <>
        <div className="bg-red-100 p-4 rounded border border-red-400">
          <h2 className="text-lg font-primary font-semibold mb-2">
            {props.status}
          </h2>
          {props.getTasksByStatus(props.status).map((task, index) => (
            <div key={index} className="bg-white p-2 rounded mb-2">
              <p
                className="text-base cursor-pointer font-secondary"
                onClick={() => props.setSelectedTask(task)}
              >
                - {task.text}
              </p>
              {props.selectedTask === task && (
                <>
                  <Action
                    status={props.status}
                    handleEditTask={props.handleEditTask}
                    handleChangePriority={props.handleChangePriority}
                    handleChangeStatus={props.handleChangeStatus}
                    handleDeleteTask={props.handleDeleteTask}
                    selectedTask={props.selectedTask}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </>
    </>
  );
}

export default StatusLayout;
