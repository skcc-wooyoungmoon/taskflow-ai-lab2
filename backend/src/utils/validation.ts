import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(error.issues);
        }
        return next(error);
    }
};

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
        status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
        dueDate: z.string().datetime().optional(),
        assigneeId: z.string().optional(),
        teamId: z.string(),
    }),
});

export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
        status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
        dueDate: z.string().datetime().optional(),
        assigneeId: z.string().optional(),
        teamId: z.string().optional(),
    }),
    params: z.object({
        id: z.string(),
    }),
});