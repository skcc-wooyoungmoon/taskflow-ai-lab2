"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json(error.issues);
        }
        return next(error);
    }
};
exports.validate = validate;
exports.createTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        priority: zod_1.z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
        status: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
        dueDate: zod_1.z.string().datetime().optional(),
        assigneeId: zod_1.z.string().optional(),
        teamId: zod_1.z.string(),
    }),
});
exports.updateTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        priority: zod_1.z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
        status: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
        dueDate: zod_1.z.string().datetime().optional(),
        assigneeId: zod_1.z.string().optional(),
        teamId: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
//# sourceMappingURL=validation.js.map