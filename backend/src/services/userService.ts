import { PrismaClient } from '@prisma/client';
import { CreateUserRequest, UpdateUserRequest } from '../types/user';

const prisma = new PrismaClient();

export const userService = {
  // Get all users
  getAllUsers: async () => {
    return prisma.user.findMany({
      include: {
        tasks: true,
        teams: true
      }
    });
  },

  // Get user by ID
  getUserById: async (id: string) => {
    return prisma.user.findUnique({ 
      where: { id },
      include: {
        tasks: true,
        teams: true
      }
    });
  },

  // Create new user
  createUser: async (userData: CreateUserRequest) => {
    return prisma.user.create({ 
      data: userData,
      include: {
        tasks: true,
        teams: true
      }
    });
  },

  // Update user
  updateUser: async (id: string, updateData: UpdateUserRequest) => {
    try {
      return await prisma.user.update({ 
        where: { id }, 
        data: updateData,
        include: {
          tasks: true,
          teams: true
        }
      });
    } catch (error) {
      return null;
    }
  },

  // Delete user
  deleteUser: async (id: string) => {
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
};