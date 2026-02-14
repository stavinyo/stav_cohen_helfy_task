const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { validateTask } = require("../middleware/taskValidator");

router.get("/", taskController.getTasks);

router.post("/", validateTask, taskController.createTask);

router.put("/:id", validateTask, taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

router.patch("/:id/toggle", taskController.toggleTaskStatus);

module.exports = router;