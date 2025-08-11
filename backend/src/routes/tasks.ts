import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { validate, createTaskSchema, updateTaskSchema } from '../utils/validation';

const router = Router();

// GET /api/tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id - Get task by ID
router.get('/:id', taskController.getTaskById);

// POST /api/tasks - Create new task
router.post('/', validate(createTaskSchema), taskController.createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

export default router; 