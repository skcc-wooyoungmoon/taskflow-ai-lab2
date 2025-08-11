import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
export declare const validate: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const createTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            HIGH: "HIGH";
            MEDIUM: "MEDIUM";
            LOW: "LOW";
        }>>;
        status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            IN_PROGRESS: "IN_PROGRESS";
            COMPLETED: "COMPLETED";
        }>>;
        dueDate: z.ZodOptional<z.ZodString>;
        assigneeId: z.ZodOptional<z.ZodString>;
        teamId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            HIGH: "HIGH";
            MEDIUM: "MEDIUM";
            LOW: "LOW";
        }>>;
        status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            IN_PROGRESS: "IN_PROGRESS";
            COMPLETED: "COMPLETED";
        }>>;
        dueDate: z.ZodOptional<z.ZodString>;
        assigneeId: z.ZodOptional<z.ZodString>;
        teamId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map