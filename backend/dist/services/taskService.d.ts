import { CreateTaskRequest, UpdateTaskRequest, Priority, Status } from '../types/task';
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
export declare const taskService: {
    getAllTasks: () => Promise<Task[]>;
    getTaskById: (id: string) => Promise<Task | null>;
    createTask: (taskData: CreateTaskRequest) => Promise<Task>;
    updateTask: (id: string, updateData: UpdateTaskRequest) => Promise<Task | null>;
    deleteTask: (id: string) => Promise<boolean>;
};
export {};
//# sourceMappingURL=taskService.d.ts.map