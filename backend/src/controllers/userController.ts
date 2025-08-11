import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

export const userController = {
  // Get all users
  getAllUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return next(error);
    }
  },

  // Get user by ID
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },

  // Create new user
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  },

  // Update user
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const updateData = req.body;
      const updatedUser = await userService.updateUser(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (error) {
      return next(error);
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
};