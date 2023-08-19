import React from 'react';
import'./TaskCard.css';

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <p>{task.id}</p>
      <h3>{task.title}</h3>
      <p className='task-tag'>{task.tag}</p>
    </div>
  );
}

export default TaskCard;
