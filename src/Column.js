import React from 'react';
import TaskCard from './TaskCard';

function Column({ title, tasks }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-cards">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;