import { PrismaClient } from '@prisma/client';
import { CreateTaskRequest, UpdateTaskRequest } from '../types/task';

const prisma = new PrismaClient();

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    return prisma.task.findMany({
      include: {
        assignee: true,
        team: true
      }
    });
  },

  // Get task by ID
  getTaskById: async (id: string) => {
    return prisma.task.findUnique({ 
      where: { id },
      include: {
        assignee: true,
        team: true
      }
    });
  },

  // Create new task
  createTask: async (taskData: CreateTaskRequest) => {
    const { dueDate, ...restData } = taskData;
    return prisma.task.create({ 
      data: {
        ...restData,
        dueDate: dueDate ? new Date(dueDate) : undefined
      },
      include: {
        assignee: true,
        team: true
      }
    });
  },

  // Update task
  updateTask: async (id: string, updateData: UpdateTaskRequest) => {
    const { dueDate, ...restData } = updateData;
    try {
      return await prisma.task.update({ 
        where: { id }, 
        data: {
          ...restData,
          dueDate: dueDate ? new Date(dueDate) : undefined
        },
        include: {
          assignee: true,
          team: true
        }
      });
    } catch (error) {
      return null;
    }
  },

  // Delete task
  deleteTask: async (id: string) => {
    try {
      await prisma.task.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}; 