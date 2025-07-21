const ITaskRepository = require("../interfaces/ITaskRepository");
const pool = require("../../config/db");

class PostgresTaskRepository extends ITaskRepository {
  async getAllTasksByUserId(userId) {
    const result = await pool.query(`
      SELECT 
        tasks.*,
        u.email AS assigned_to_email,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', todos.id,
              'content', todos.content,
              'order_index', todos.order_index,
              'is_done', todos.is_done
            )
          ) FILTER (WHERE todos.id IS NOT NULL),
          '[]'
        ) AS todos
      FROM tasks
      LEFT JOIN todos ON tasks.id = todos.task_id
      LEFT JOIN users u ON tasks.assigned_to = u.id
      WHERE tasks.assigned_to = $1
      GROUP BY tasks.id, u.email
    `, [userId]);

    return result.rows;
  }

  async getTaskById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  async createTask(taskData) {
    const { title, description, deadline, assigned_to, status_id, created_by } = taskData;
    const result = await pool.query(`
      INSERT INTO tasks (title, description, deadline, assigned_to, status_id, created_by)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, deadline, assigned_to, status_id, created_by]
    );
    return result.rows[0];
  }

  async insertTodos(taskId, todos) {
    const promises = todos.map((todo, index) => {
      return pool.query(`
        INSERT INTO todos (task_id, content, order_index, is_done)
        VALUES ($1, $2, $3, $4)`,
        [taskId, todo.content, index, todo.is_done || false]
      );
    });
    await Promise.all(promises);
  }

  async deleteTask(id) {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  }
}

module.exports = PostgresTaskRepository;
