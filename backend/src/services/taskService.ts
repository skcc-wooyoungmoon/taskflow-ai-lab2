import { CreateTaskRequest, UpdateTaskRequest, Priority, Status } from '../types/task';

// Mock data store (in production, this would be replaced with Prisma)
interface Task {
  id: string;
  title: string;
  description?: string | undefined;
  priority: Priority;
  status: Status;
  dueDate?: string | undefined;
  createdAt: string;
  updatedAt: string;
  assigneeId?: string | undefined;
  teamId: string;
}

let mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Setup project structure',
    description: 'Initialize the backend and frontend structure for TaskFlow',
    priority: Priority.HIGH,
    status: Status.COMPLETED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teamId: 'default-team-id'
  },
  {
    id: 'task2',
    title: 'Implement API endpoints',
    description: 'Create RESTful API endpoints for task CRUD operations',
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teamId: 'default-team-id'
  },
  {
    id: 'task3',
    title: 'Design UI components',
    description: 'Create responsive React components with Tailwind CSS',
    priority: Priority.LOW,
    status: Status.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teamId: 'default-team-id'
  }
];

function generateId(): string {
  return 'task_' + Math.random().toString(36).substr(2, 9);
}

export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    return mockTasks;
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task | null> => {
    const task = mockTasks.find(t => t.id === id);
    return task || null;
  },

  // Create new task
  createTask: async (taskData: CreateTaskRequest): Promise<Task> => {
    const newTask: Task = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description || undefined,
      priority: taskData.priority || Priority.MEDIUM,
      status: taskData.status || Status.PENDING,
      dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assigneeId: taskData.assigneeId || undefined,
      teamId: taskData.teamId
    };
    
    mockTasks.push(newTask);
    return newTask;
  },

  // Update task
  updateTask: async (id: string, updateData: UpdateTaskRequest): Promise<Task | null> => {
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return null;
    }

    const currentTask = mockTasks[taskIndex];
    if (!currentTask) return null;
    
    const updatedTask: Task = {
      id: currentTask.id,
      title: updateData.title || currentTask.title,
      description: updateData.description !== undefined ? updateData.description : currentTask.description,
      priority: updateData.priority || currentTask.priority,
      status: updateData.status || currentTask.status,
      dueDate: updateData.dueDate ? updateData.dueDate.toISOString() : currentTask.dueDate,
      createdAt: currentTask.createdAt,
      updatedAt: new Date().toISOString(),
      assigneeId: updateData.assigneeId !== undefined ? updateData.assigneeId : currentTask.assigneeId,
      teamId: updateData.teamId || currentTask.teamId
    };

    mockTasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  // Delete task
  deleteTask: async (id: string): Promise<boolean> => {
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return false;
    }

    mockTasks.splice(taskIndex, 1);
    return true;
  }
}; 