const PostgresTaskRepository = require("../repositories/implementations/PostgresTaskRepository");
const TaskService = require("../services/implementations/TaskService");

const taskRepo = new PostgresTaskRepository();
const taskService = new TaskService(taskRepo);

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTaskWithTodos({
      ...req.body,
      created_by: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user.id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
