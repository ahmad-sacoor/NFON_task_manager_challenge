import React, { useState, useCallback } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleTaskUpdated = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      <main className="app-main">
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refreshTrigger={refreshTrigger} onTaskUpdated={handleTaskUpdated} />
      </main>
    </div>
  );
}

export default App;
