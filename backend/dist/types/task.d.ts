export declare enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}
export declare enum Status {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
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
//# sourceMappingURL=task.d.ts.map