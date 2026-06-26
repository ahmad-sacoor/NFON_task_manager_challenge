import React from 'react';
import { Task } from '../types';
import { completeTask } from '../api';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
}

function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
  const handleComplete = async () => {
    try {
      await completeTask(task.id);
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleDelete = async () => {
    // TODO: Implement delete functionality
  };

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      <div className="task-actions">
        {!task.completed && (
          <button className="btn btn-complete" onClick={handleComplete}>
            Complete
          </button>
        )}
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
