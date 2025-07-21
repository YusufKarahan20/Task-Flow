const IAuthRepository = require("../interfaces/IAuthRepository");
const pool = require("../../config/db");

class PostgresAuthRepository extends IAuthRepository {
  async findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  async createUser(email) {
    const result = await pool.query(
      `INSERT INTO users (email, password, created_at) VALUES ($1, $2, NOW()) RETURNING id`,
      [email, "firebase"]
    );
    return result.rows[0].id;
  }

  async getRoleIdByName(roleName) {
    const result = await pool.query(`SELECT id FROM roles WHERE name = $1`, [roleName]);
    return result.rows.length > 0 ? result.rows[0].id : null;
  }

  async assignRoleToUser(userId, roleId) {
    await pool.query(
      `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
      [userId, roleId]
    );
  }

  async findUserWithRoleByEmail(email) {
    const result = await pool.query(
      `SELECT u.id, u.email, r.name as role
       FROM users u
       JOIN user_roles ur ON u.id = ur.user_id
       JOIN roles r ON ur.role_id = r.id
       WHERE u.email = $1`,
      [email]
    );
    return result.rows[0];  // Giren kullanıcıya ait obje ya da undefined
  }
}

module.exports = PostgresAuthRepository;
