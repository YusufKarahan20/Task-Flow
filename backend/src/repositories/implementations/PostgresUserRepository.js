const IUserRepository = require("../interfaces/IUserRepository");
const pool = require("../../config/db");

class PostgresUserRepository extends IUserRepository {
  async getAllUsers() {
    const result = await pool.query("SELECT id, email FROM users");
    return result.rows;
  }
}

module.exports = PostgresUserRepository;
