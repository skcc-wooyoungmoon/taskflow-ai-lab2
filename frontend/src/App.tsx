import React, { useState } from 'react';
import { Task, Status, CreateTaskData, UpdateTaskData } from './types/task';
import { useTasks } from './hooks/useTasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (data: CreateTaskData) => {
    setIsSubmitting(true);
    const success = await createTask(data);
    setIsSubmitting(false);
    if (success) {
      setShowForm(false);
    }
  };

  const handleUpdateTask = async (data: UpdateTaskData) => {
    if (!editingTask) return;
    setIsSubmitting(true);
    const success = await updateTask(editingTask.id, data);
    setIsSubmitting(false);
    if (success) {
      setEditingTask(undefined);
    }
  };

  const handleStatusChange = async (id: string, status: Status) => {
    await updateTask(id, { status });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
              <p className="mt-2 text-gray-600">Manage your team's tasks efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span className="text-xl">+</span>
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Task Form Modal */}
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCloseForm}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default App
