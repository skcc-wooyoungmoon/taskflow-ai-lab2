"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.get('/', taskController_1.taskController.getAllTasks);
router.get('/:id', taskController_1.taskController.getTaskById);
router.post('/', (0, validation_1.validate)(validation_1.createTaskSchema), taskController_1.taskController.createTask);
router.put('/:id', (0, validation_1.validate)(validation_1.updateTaskSchema), taskController_1.taskController.updateTask);
router.delete('/:id', taskController_1.taskController.deleteTask);
exports.default = router;
//# sourceMappingURL=tasks.js.map