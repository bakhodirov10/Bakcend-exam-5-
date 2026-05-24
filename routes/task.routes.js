const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task.controller")

// routes/task.routes.js fayli ichida:

router.get("/tasks", taskController.getTasks);          // Bor edi
router.get("/task/:id", taskController.getTaskById);    // /task/:id edi -> /tasks/:id qildik
router.post("/task", taskController.creataTask);        // /task edi -> /tasks qildik 🚀 (Siz qidirgan xato)
router.put("/task/:id", taskController.updateTask);      // /task/:id edi -> /tasks/:id qildik
router.patch("/task/:id", taskController.patchTask);    // /task/:id edi -> /tasks/:id qildik
router.delete("/task/:id", taskController.deleteTask);  // /task/:id edi -> /tasks/:id qildik

module.exports = router