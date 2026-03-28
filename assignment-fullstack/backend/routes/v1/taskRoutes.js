const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const { protect } = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/roleMiddleware');

// Get all tasks (admin only) or user's tasks
router.get('/', protect, async (req, res, next) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('userId', 'name email');
    } else {
      tasks = await Task.find({ userId: req.user._id });
    }
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
});

// Create task
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      userId: req.user._id
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', protect, async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: `Task not found with id of ${req.params.id}` });
    }

    if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: `User not authorized to update this task` });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: `Task not found with id of ${req.params.id}` });
    }

    if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: `User not authorized to delete this task` });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
