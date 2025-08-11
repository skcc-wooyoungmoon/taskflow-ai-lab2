// Mock data store for users
interface User {
  id: string;
  email: string;
  name?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserRequest {
  email: string;
  name?: string;
}

interface UpdateUserRequest {
  email?: string;
  name?: string;
}

let mockUsers: User[] = [
  {
    id: 'user1',
    email: 'john@example.com',
    name: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function generateUserId(): string {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    return mockUsers;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User | null> => {
    const user = mockUsers.find(u => u.id === id);
    return user || null;
  },

  // Create new user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const newUser: User = {
      id: generateUserId(),
      email: userData.email,
      name: userData.name || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    return newUser;
  },

  // Update user
  updateUser: async (id: string, updateData: UpdateUserRequest): Promise<User | null> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    const currentUser = mockUsers[userIndex];
    if (!currentUser) return null;
    
    const updatedUser: User = {
      id: currentUser.id,
      email: updateData.email || currentUser.email,
      name: updateData.name !== undefined ? updateData.name : currentUser.name,
      createdAt: currentUser.createdAt,
      updatedAt: new Date().toISOString()
    };

    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  // Delete user
  deleteUser: async (id: string): Promise<boolean> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return false;
    }

    mockUsers.splice(userIndex, 1);
    return true;
  }
};