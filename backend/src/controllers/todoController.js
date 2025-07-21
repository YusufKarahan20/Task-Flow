const PostgresTodoRepository = require("../repositories/implementations/PostgresTodoRepository");
const TodoService = require("../services/implementations/TodoService");

const todoRepo = new PostgresTodoRepository();
const todoService = new TodoService(todoRepo);

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { is_done } = req.body;

  try {
    const updated = await todoService.updateTodo(id, is_done);
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ To-do güncellenemedi:", err);
    res.status(404).json({ error: err.message });
  }
};
