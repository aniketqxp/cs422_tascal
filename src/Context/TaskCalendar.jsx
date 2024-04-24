import React, {useState} from "react";
import { useSwipeable } from "react-swipeable";
import EditTask from "./EditTask";

const TaskCalendar = (props) => {
  const [tasks, setTasks] = [props.tasks, props.setTasks];
  const [editTask, setEditTask] = useState(null);



  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
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
            <div key={task.id} className="task-cal-item" {...handlers}>
              <div className="task-box">
                <p><b>{task.text}</b></p>    
                <p>🗓️ {props.date_format(task.time)}</p>
                <p>🔨 {task.status}</p>
                <p>❗ {task.priority} Priority</p>
              </div>
              <div className="task-cal-actions">
                <button className="calendar-button btn" onClick={() =>{
                  props.setSelectedTask(task);
                  props.setOpenModal(true);
                }}>Edit</button>
                <button className="calendar-button btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
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