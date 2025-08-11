import { Request, Response, NextFunction } from 'express';
export declare const userController: {
    getAllUsers: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    getUserById: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
};
//# sourceMappingURL=userController.d.ts.map