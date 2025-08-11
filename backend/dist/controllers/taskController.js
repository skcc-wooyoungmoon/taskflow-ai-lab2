"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const taskService_1 = require("../services/taskService");
exports.taskController = {
    getAllTasks: async (_req, res, next) => {
        try {
            const tasks = await taskService_1.taskService.getAllTasks();
            return res.json(tasks);
        }
        catch (error) {
            return next(error);
        }
    },
    getTaskById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Task ID is required' });
            }
            const task = await taskService_1.taskService.getTaskById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(task);
        }
        catch (error) {
            return next(error);
        }
    },
    createTask: async (req, res, next) => {
        try {
            const taskData = req.body;
            const newTask = await taskService_1.taskService.createTask(taskData);
            return res.status(201).json(newTask);
        }
        catch (error) {
            return next(error);
        }
    },
    updateTask: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Task ID is required' });
            }
            const updateData = req.body;
            const updatedTask = await taskService_1.taskService.updateTask(id, updateData);
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(updatedTask);
        }
        catch (error) {
            return next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Task ID is required' });
            }
            const deleted = await taskService_1.taskService.deleteTask(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(204).send();
        }
        catch (error) {
            return next(error);
        }
    }
};
//# sourceMappingURL=taskController.js.map