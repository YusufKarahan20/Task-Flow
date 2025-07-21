const ITodoService = require("../interfaces/ITodoService");

class TodoService extends ITodoService {
  constructor(todoRepository) {
    super();
    this.todoRepository = todoRepository;
  }

  async updateTodo(id, is_done) {
    const todo = await this.todoRepository.updateTodoStatus(id, is_done);
    if (!todo) {
      throw new Error("To-do bulunamadı");
    }
    return todo;
  }
}

module.exports = TodoService;
