"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const task_1 = require("../types/task");
let mockTasks = [
    {
        id: 'task1',
        title: 'Setup project structure',
        description: 'Initialize the backend and frontend structure for TaskFlow',
        priority: task_1.Priority.HIGH,
        status: task_1.Status.COMPLETED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        teamId: 'default-team-id'
    },
    {
        id: 'task2',
        title: 'Implement API endpoints',
        description: 'Create RESTful API endpoints for task CRUD operations',
        priority: task_1.Priority.MEDIUM,
        status: task_1.Status.IN_PROGRESS,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        teamId: 'default-team-id'
    },
    {
        id: 'task3',
        title: 'Design UI components',
        description: 'Create responsive React components with Tailwind CSS',
        priority: task_1.Priority.LOW,
        status: task_1.Status.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        teamId: 'default-team-id'
    }
];
function generateId() {
    return 'task_' + Math.random().toString(36).substr(2, 9);
}
exports.taskService = {
    getAllTasks: async () => {
        return mockTasks;
    },
    getTaskById: async (id) => {
        const task = mockTasks.find(t => t.id === id);
        return task || null;
    },
    createTask: async (taskData) => {
        const newTask = {
            id: generateId(),
            title: taskData.title,
            description: taskData.description || undefined,
            priority: taskData.priority || task_1.Priority.MEDIUM,
            status: taskData.status || task_1.Status.PENDING,
            dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            assigneeId: taskData.assigneeId || undefined,
            teamId: taskData.teamId
        };
        mockTasks.push(newTask);
        return newTask;
    },
    updateTask: async (id, updateData) => {
        const taskIndex = mockTasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return null;
        }
        const currentTask = mockTasks[taskIndex];
        if (!currentTask)
            return null;
        const updatedTask = {
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
    deleteTask: async (id) => {
        const taskIndex = mockTasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return false;
        }
        mockTasks.splice(taskIndex, 1);
        return true;
    }
};
//# sourceMappingURL=taskService.js.map