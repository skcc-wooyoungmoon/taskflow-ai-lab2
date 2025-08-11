import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';

export const taskController = {
  // Get all tasks
  getAllTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  // Get task by ID
  getTaskById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  // Create new task
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },

  // Update task
  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTask = await taskService.updateTask(id, updateData);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },

  // Delete task
  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await taskService.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}; 