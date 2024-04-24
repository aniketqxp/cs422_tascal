import React, { useEffect, useState } from "react";
import StatusLayout from "./StatusLayout";

const TaskBoard = (props) => {
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [selectedTask, setSelectedTask] = [props.selectedTask, props.setSelectedTask];

 


  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };


  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8">
      

      <div className="mt-8 space-y-4 text-black ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do */}
          <StatusLayout
            id="to-do"
            openModal = {props.openModal}
            setOpenModal = {props.setOpenModal}
            date_format = {props.date_format}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleDeleteTask = {handleDeleteTask}
            status="To Do"
            tasks = {tasks}

          />
          {/* Doing */}
          <StatusLayout
            id="doing"
            openModal = {props.openModal}
            setOpenModal = {props.setOpenModal}
            date_format = {props.date_format}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleDeleteTask = {handleDeleteTask}
            status="Doing"
            tasks = {tasks}
          />
          {/* Done */}
          <StatusLayout
            id="done"
            openModal = {props.openModal}
            setOpenModal = {props.setOpenModal}
            date_format = {props.date_format}
            getTasksByStatus = {getTasksByStatus}
            setSelectedTask = {setSelectedTask}
            selectedTask = {selectedTask}
            handleDeleteTask = {handleDeleteTask}
            status="Done"
            tasks = {tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;