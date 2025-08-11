import { useState } from 'react';
import type { Task, Status } from '../types/task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

type FilterType = 'all' | Status;
type SortType = 'created' | 'priority' | 'dueDate' | 'title';

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getStatusCount = (status: Status) => {
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div className="space-y-4">
      {/* Filters and Sort Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                onClick={() => setFilter('PENDING')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === 'PENDING' 
                    ? 'bg-gray-100 text-gray-800 ring-2 ring-gray-400' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Pending ({getStatusCount('PENDING')})
              </button>
              <button
                onClick={() => setFilter('IN_PROGRESS')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === 'IN_PROGRESS' 
                    ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-400' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                In Progress ({getStatusCount('IN_PROGRESS')})
              </button>
              <button
                onClick={() => setFilter('COMPLETED')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === 'COMPLETED' 
                    ? 'bg-green-100 text-green-800 ring-2 ring-green-400' 
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                Completed ({getStatusCount('COMPLETED')})
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="created">Created Date</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'all' ? 'No tasks yet' : `No ${filter.toLowerCase().replace('_', ' ')} tasks`}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Create your first task to get started!' 
              : `No tasks match the selected filter.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}