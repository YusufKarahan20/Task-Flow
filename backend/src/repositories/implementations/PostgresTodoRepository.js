const ITodoRepository = require("../interfaces/ITodoRepository");
const pool = require("../../config/db");

class PostgresTodoRepository extends ITodoRepository {
  async updateTodoStatus(id, is_done) {
    const result = await pool.query(
      `UPDATE todos SET is_done = $1 WHERE id = $2 RETURNING *`,
      [is_done, id]
    );
    return result.rows[0]; // null dönerse controller'da 404 döneceğiz
  }
}

module.exports = PostgresTodoRepository;
