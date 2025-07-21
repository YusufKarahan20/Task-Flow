const IStatusRepository = require("../interfaces/IStatusRepository");
const pool = require("../../config/db");

class PostgresStatusRepository extends IStatusRepository {
  async getAllStatuses() {
    const result = await pool.query("SELECT id, name FROM statuses");
    return result.rows;
  }
}

module.exports = PostgresStatusRepository;
