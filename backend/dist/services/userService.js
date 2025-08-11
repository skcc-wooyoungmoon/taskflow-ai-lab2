"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
let mockUsers = [
    {
        id: 'user1',
        email: 'john@example.com',
        name: 'John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}
exports.userService = {
    getAllUsers: async () => {
        return mockUsers;
    },
    getUserById: async (id) => {
        const user = mockUsers.find(u => u.id === id);
        return user || null;
    },
    createUser: async (userData) => {
        const newUser = {
            id: generateUserId(),
            email: userData.email,
            name: userData.name || undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        mockUsers.push(newUser);
        return newUser;
    },
    updateUser: async (id, updateData) => {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return null;
        }
        const currentUser = mockUsers[userIndex];
        if (!currentUser)
            return null;
        const updatedUser = {
            id: currentUser.id,
            email: updateData.email || currentUser.email,
            name: updateData.name !== undefined ? updateData.name : currentUser.name,
            createdAt: currentUser.createdAt,
            updatedAt: new Date().toISOString()
        };
        mockUsers[userIndex] = updatedUser;
        return updatedUser;
    },
    deleteUser: async (id) => {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return false;
        }
        mockUsers.splice(userIndex, 1);
        return true;
    }
};
//# sourceMappingURL=userService.js.map