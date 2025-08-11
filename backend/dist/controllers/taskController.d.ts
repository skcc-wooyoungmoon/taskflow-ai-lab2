import { Request, Response, NextFunction } from 'express';
export declare const taskController: {
    getAllTasks: (_req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    getTaskById: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createTask: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    updateTask: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    deleteTask: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
};
//# sourceMappingURL=taskController.d.ts.map