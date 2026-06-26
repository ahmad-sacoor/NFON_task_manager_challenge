import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { fetchTasks } from '../api';
import TaskItem from './TaskItem';

interface TaskListProps {
  refreshTrigger: number;
  onTaskUpdated: () => void;
}

function TaskList({ refreshTrigger, onTaskUpdated }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="task-list-error">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="task-list-empty">No tasks yet. Add one above!</div>;
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
      ))}
    </div>
  );
}

export default TaskList;
