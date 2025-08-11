"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
exports.userController = {
    getAllUsers: async (_req, res, next) => {
        try {
            const users = await userService_1.userService.getAllUsers();
            return res.json(users);
        }
        catch (error) {
            return next(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const user = await userService_1.userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        }
        catch (error) {
            return next(error);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const userData = req.body;
            const newUser = await userService_1.userService.createUser(userData);
            return res.status(201).json(newUser);
        }
        catch (error) {
            return next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const updateData = req.body;
            const updatedUser = await userService_1.userService.updateUser(id, updateData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(updatedUser);
        }
        catch (error) {
            return next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const deleted = await userService_1.userService.deleteUser(id);
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(204).send();
        }
        catch (error) {
            return next(error);
        }
    }
};
//# sourceMappingURL=userController.js.map