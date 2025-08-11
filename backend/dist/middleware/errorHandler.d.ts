import { Request, Response, NextFunction } from 'express';
export interface CustomError extends Error {
    statusCode?: number;
}
export declare const errorHandler: (error: CustomError, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map