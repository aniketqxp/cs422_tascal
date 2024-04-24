import React, {useState } from "react";
import Layout from "./Layout";

const TaskList = (props) => {
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [selectedTask, setSelectedTask] = useState(null);



  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
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
          {/* High Priority */}
          <Layout
            date_format = {props.date_format}
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            handleDeleteTask = {handleDeleteTask}
            selectedTask={selectedTask}
            level="High"
          />
          {/* Medium Priority */}
          <Layout
            date_format = {props.date_format}
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            handleDeleteTask = {handleDeleteTask}
            selectedTask={selectedTask}
            level="Medium"
          />
          {/* Low Priority */}
          <Layout
            date_format = {props.date_format}
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            handleDeleteTask = {handleDeleteTask}
            selectedTask={selectedTask}
            level="Low"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
