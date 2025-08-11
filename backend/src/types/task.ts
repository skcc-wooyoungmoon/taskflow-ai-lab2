// Define enums locally until Prisma client is generated
export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

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