class ITaskRepository {
  async getAllTasksByUserId(userId) { throw new Error("Not implemented."); }
  async getTaskById(id) { throw new Error("Not implemented."); }
  async createTask(taskData) { throw new Error("Not implemented."); }
  async insertTodos(taskId, todosArray) { throw new Error("Not implemented."); }
  async deleteTask(id) { throw new Error("Not implemented."); }
}
module.exports = ITaskRepository;
