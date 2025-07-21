class IAuthRepository {
  async findUserByEmail(email) {
    throw new Error("Method not implemented.");
  }

  async createUser(email) {
    throw new Error("Method not implemented.");
  }

  async getRoleIdByName(roleName) {
    throw new Error("Method not implemented.");
  }

  async assignRoleToUser(userId, roleId) {
    throw new Error("Method not implemented.");
  }

  async findUserWithRoleByEmail(email) {
    throw new Error("Method not implemented.");
  }
}

module.exports = IAuthRepository;
