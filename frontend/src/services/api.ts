import type { Task, CreateTaskData, UpdateTaskData } from '../types/task';

const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  private static async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
  }

  // Task API methods
  static async getTasks(): Promise<Task[]> {
    return this.fetchWithErrorHandling<Task[]>('/tasks');
  }

  static async getTask(id: string): Promise<Task> {
    return this.fetchWithErrorHandling<Task>(`/tasks/${id}`);
  }

  static async createTask(taskData: CreateTaskData): Promise<Task> {
    return this.fetchWithErrorHandling<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  static async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    return this.fetchWithErrorHandling<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  static async deleteTask(id: string): Promise<void> {
    await this.fetchWithErrorHandling<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}