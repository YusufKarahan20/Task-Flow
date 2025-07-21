class IAuthService {
  async register(idToken, role, code) {
    throw new Error("Method not implemented.");
  }

  async getMe(user) {
    throw new Error("Method not implemented.");
  }
}

module.exports = IAuthService;
