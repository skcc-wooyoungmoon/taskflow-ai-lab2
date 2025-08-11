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
export declare const userService: {
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: string) => Promise<User | null>;
    createUser: (userData: CreateUserRequest) => Promise<User>;
    updateUser: (id: string, updateData: UpdateUserRequest) => Promise<User | null>;
    deleteUser: (id: string) => Promise<boolean>;
};
export {};
//# sourceMappingURL=userService.d.ts.map