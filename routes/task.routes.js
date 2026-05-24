const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task.controller")

router.get(
    "/tasks",
    taskController.getTasks
)

router.get(
    "/task/:id",
    taskController.getTaskById
)

router.post(
    "/task",
    taskController.creataTask
)

router.put(
    "/task/:id",
    taskController.updateTask
)

router.patch(
    "/task/:id",         // bu yerda hatolik chiqishi munkun 
    taskController.patchTask
)

router.delete(
    "/task/:id",
    taskController.deleteTask
)

module.exports = router