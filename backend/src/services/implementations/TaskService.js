const ITaskService = require("../interfaces/ITaskService");

class TaskService extends ITaskService {
  constructor(taskRepository) {
    super();
    this.taskRepository = taskRepository;
  }

  async createTaskWithTodos(taskData) {
    const task = await this.taskRepository.createTask(taskData);
    if (taskData.todos?.length) {
      await this.taskRepository.insertTodos(task.id, taskData.todos);
    }
    return task;
  }

  async getTasksByUser(userId) {
    return await this.taskRepository.getAllTasksByUserId(userId);
  }

  async deleteTask(id) {
    await this.taskRepository.deleteTask(id);
  }
}

module.exports = TaskService;
