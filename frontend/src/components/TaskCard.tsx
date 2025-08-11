import React from 'react';
import { Task, Priority, Status } from '../types/task';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  HIGH: 'bg-red-100 text-red-800 border-red-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  LOW: 'bg-green-100 text-green-800 border-green-200',
};

const statusColors = {
  PENDING: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as Status);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-2">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 mb-4 text-sm">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${statusColors[task.status]}`}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            Due: {formatDate(task.dueDate)}
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Created: {formatDate(task.createdAt)}</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}