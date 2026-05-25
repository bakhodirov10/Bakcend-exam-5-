const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskController.creataTask);
router.put("/tasks/:id", taskController.updateTask);
router.patch("/tasks/:id", taskController.patchTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
