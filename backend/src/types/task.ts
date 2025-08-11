import { Priority, Status } from '@prisma/client';

export type CreateTaskRequest = {
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: Date;
  assigneeId?: string;
  teamId: string;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: Date;
  assigneeId?: string;
  teamId?: string;
};