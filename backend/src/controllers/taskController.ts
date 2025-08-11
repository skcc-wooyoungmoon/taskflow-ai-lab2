import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';

export const taskController = {
  // Get all tasks
  getAllTasks: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getAllTasks();
      return res.json(tasks);
    } catch (error) {
      return next(error);
    }
  },

  // Get task by ID
  getTaskById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
      const task = await taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(task);
    } catch (error) {
      return next(error);
    }
  },

  // Create new task
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);
      return res.status(201).json(newTask);
    } catch (error) {
      return next(error);
    }
  },

  // Update task
  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
      const updateData = req.body;
      const updatedTask = await taskService.updateTask(id, updateData);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(updatedTask);
    } catch (error) {
      return next(error);
    }
  },

  // Delete task
  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
      const deleted = await taskService.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}; 