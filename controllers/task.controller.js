const mongoose = require("mongoose");
const Task = require("../models/task.model");
const taskSchema = require("../validators/task.validator");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: `Error getTasks-da : ${error.message}`,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task is no found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: `Error is on getTaskById: ${error.message} `,
    });
  }
};

exports.creataTask = async (req, res) => {
  try {
    const validation = taskSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: validation.error.errors,
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    await newTask.save();

    res.status(201).json({
      message: "Ma'lumot muvaffaqiyatli yaratildi",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error createTask-da : ${error.message}`,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task is no found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: `Error updateTask-da : ${error.message}`,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Ma'lumot topilmadi!",
      });
    }

    res.status(200).json({
      message: "Muvaffaqiyatli ochirildi!",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleteTask-da: ${error.message}`,
    });
  }
};

exports.patchTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: `Error patchTask-da : ${error.message}`,
    });
    console.log(error.message);
  }
};
