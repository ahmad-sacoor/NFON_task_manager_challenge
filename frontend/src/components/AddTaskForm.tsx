import React, { useState } from 'react';
import { createTask } from '../api';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createTask({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (err) {
      console.error('Failed to create task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-add" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default AddTaskForm;
