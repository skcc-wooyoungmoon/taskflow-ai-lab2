export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  assigneeId?: string;
  teamId: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: string;
  assigneeId?: string;
  teamId: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: string;
  assigneeId?: string;
}