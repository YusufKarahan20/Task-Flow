const IUserService = require("../interfaces/IUserService");

class UserService extends IUserService {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
}

module.exports = UserService;
