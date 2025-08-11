import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { Task, Priority, Status, CreateTaskData, UpdateTaskData } from '../types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskData | UpdateTaskData) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function TaskForm({ task, onSubmit, onCancel, isSubmitting = false }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as Priority,
    status: 'PENDING' as Status,
    dueDate: '',
    teamId: 'default-team-id', // TODO: Make this dynamic when teams are implemented
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        teamId: task.teamId,
      });
    }
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      description: formData.description || undefined,
      dueDate: formData.dueDate || undefined,
    };

    if (task) {
      // Update task - don't include teamId
      const { teamId: _teamId, ...updateData } = submitData;
      void _teamId;
      onSubmit(updateData);
    } else {
      // Create new task
      onSubmit(submitData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task description (optional)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}